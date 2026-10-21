import { Router } from "express";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { subscriptions } from "../db/schema.js";
import { auth } from "../auth.js";

export const subscriptionsRouter = Router();

// GET: the active subscription of the user
subscriptionsRouter.get("/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const [activeSub] = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, session.user.id),
          eq(subscriptions.status, "active"),
        ),
      )
      .limit(1);

    res.json(activeSub || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
});

// POST: Select o change plan
subscriptionsRouter.post("/", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { membershipId } = req.body;
    if (!membershipId)
      return res.status(400).json({ error: "Missing membershipId" });

    // 1. Cancel the previous active subscription
    await db
      .update(subscriptions)
      .set({ status: "cancelled" })
      .where(
        and(
          eq(subscriptions.userId, session.user.id),
          eq(subscriptions.status, "active"),
        ),
      );

    // 2. Create the new active subscription
    const [newSub] = await db
      .insert(subscriptions)
      .values({
        id: randomUUID(),
        userId: session.user.id,
        membershipId: membershipId,
        status: "active",
      })
      .returning();

    res.status(201).json(newSub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update subscription" });
  }
});
