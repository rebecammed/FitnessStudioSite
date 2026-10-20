import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { memberships } from "../db/schema.js";

export const membershipsRouter = Router();

// GET all memberships
membershipsRouter.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(memberships);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
});

// GET a single membership by ID
membershipsRouter.get("/:id", async (req, res) => {
  try {
    const [row] = await db
      .select()
      .from(memberships)
      .where(eq(memberships.id, req.params.id))
      .limit(1);

    if (!row) return res.status(404).json({ error: "No such membership" });
    res.json(row);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch membership" });
  }
});
