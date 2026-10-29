import { Router } from "express";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { bookings, classes, trainers } from "../db/schema.js";
import { auth } from "../auth.js";

export const bookingsRouter = Router();

// GET: the booked classes of this user
bookingsRouter.get("/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const userBookings = await db
      .select({
        id: bookings.id,
        createdAt: bookings.createdAt,
        classId: classes.id,
        className: classes.name,
        time: classes.time,
        day: classes.day,
        trainerName: trainers.name,
      })
      .from(bookings)
      .leftJoin(classes, eq(bookings.classId, classes.id))
      .leftJoin(trainers, eq(classes.trainerId, trainers.id))
      .where(eq(bookings.userId, session.user.id));

    res.json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// POST: book a class
bookingsRouter.post("/", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { classId } = req.body;
    if (!classId) return res.status(400).json({ error: "Missing classId" });

    // 1. Check if the user has already booked this class
    const [existingBooking] = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.userId, session.user.id),
          eq(bookings.classId, classId),
        ),
      )
      .limit(1);

    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "You have already booked this class." });
    }

    // 2. Check if the class exists and has available spots
    const [classToBook] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, classId))
      .limit(1);

    if (!classToBook) {
      return res.status(404).json({ error: "Class not found." });
    }

    if (classToBook.availableSpots <= 0) {
      return res.status(400).json({ error: "This class is full." });
    }

    // 3. Create the booking
    const newBooking = await db
      .insert(bookings)
      .values({
        id: randomUUID(),
        userId: session.user.id,
        classId: classId,
      })
      .returning();

    // 4. Substract an available spot from the class
    await db
      .update(classes)
      .set({ availableSpots: classToBook.availableSpots - 1 })
      .where(eq(classes.id, classId));

    res.status(201).json(newBooking[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book class" });
  }
});

bookingsRouter.delete("/:id", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    // 1. Get the booking and make sure the userID is the same
    const [booking] = await db
      .select()
      .from(bookings)
      .where(and(eq(bookings.id, id), eq(bookings.userId, session.user.id)))
      .limit(1);

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // 2. Delete the booking
    await db.delete(bookings).where(eq(bookings.id, id));

    // 3. Return the spot to the class
    const [classToUpdate] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, booking.classId))
      .limit(1);
    if (classToUpdate) {
      await db
        .update(classes)
        .set({ availableSpots: classToUpdate.availableSpots + 1 })
        .where(eq(classes.id, booking.classId));
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});
