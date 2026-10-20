import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { classes } from "../db/schema.js";

export const classesRouter = Router();

// GET all classes
classesRouter.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(classes);
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
