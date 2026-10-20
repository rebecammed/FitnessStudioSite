import { Router } from "express";
import { db } from "../db/index.js";
import { trainers } from "../db/schema.js";

export const trainersRouter = Router();

// GET all trainers
trainersRouter.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(trainers);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});
