import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "../db/index.js";
import { contactMessages } from "../db/schema.js";

export const contactRouter = Router();

// POST a new contact message
contactRouter.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required." });
    }

    // Add to database
    await db.insert(contactMessages).values({
      id: randomUUID(),
      name,
      email,
      message,
    });

    res.status(201).json({ success: true, message: "Message received." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save message" });
  }
});
