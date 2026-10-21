import { Router } from "express";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { ratings } from "../db/schema.js";
import { auth } from "../auth.js";

export const ratingsRouter = Router();

// GET: the ratings by this user
ratingsRouter.get("/me", async (req, res) => {
  try {
    // We ask Better Auth to read the session cookie
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    // we get the ratings of this user
    const userRatings = await db
      .select()
      .from(ratings)
      .where(eq(ratings.userId, session.user.id));

    res.json(userRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

// POST: Save or update a rating
ratingsRouter.post("/", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { trainerId, value } = req.body;

    if (!trainerId || !value) {
      return res.status(400).json({ error: "Missing trainerId or value" });
    }

    // We insert the rating. If there was a preexisting one for that user and trainer (onConflictDoUpdate),
    // we update the value instead of throwing an error.
    await db
      .insert(ratings)
      .values({
        id: randomUUID(),
        userId: session.user.id,
        trainerId,
        value,
      })
      .onConflictDoUpdate({
        target: [ratings.userId, ratings.trainerId],
        set: { value: value },
      });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save rating" });
  }
});
