import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "../db/index.js";
import { classes, trainers } from "../db/schema.js";

export const classesRouter = Router();

// GET all classes
classesRouter.get("/", async (req, res) => {
  try {
    const rows = await db
      .select({
        // Select all of the fields from the class
        id: classes.id,
        time: classes.time,
        name: classes.name,
        level: classes.level,
        day: classes.day,
        totalSpots: classes.totalSpots,
        availableSpots: classes.availableSpots,
        // And nest the trainer object so the format is cleaner for the client
        trainer: {
          id: trainers.id,
          name: trainers.name,
          specialty: trainers.specialty,
        },
      })
      .from(classes)
      // LEFT JOIN so the classes that don't have a trainer appear as well
      .leftJoin(trainers, eq(classes.trainerId, trainers.id))
      // ORDER BY ASC so the schedule stays visually easy to understand
      .orderBy(asc(classes.time));

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// GET a single class by ID
classesRouter.get("/:id", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, req.params.id))
      .limit(1);

    if (!row) return res.status(404).json({ error: "No such class" });
    res.json(row);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class" });
  }
});
