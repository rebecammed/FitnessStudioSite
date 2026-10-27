import { Router } from "express";
import express from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, subscriptions } from "../db/schema.js";
import { stripe } from "../lib/stripe.js";

export const webhooksRouter = Router();

// ⚠️ IMPORTANT:  This route need the raw body, not JSON.
// Because of that we use express.raw instead of app.use(express.json()) for this route.
webhooksRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      // Verify the request comes from Stripe using the secret
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // If the payment is complete
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.client_reference_id;

      try {
        // 1. Get the order from our db
        const [order] = await db
          .select()
          .from(orders)
          .where(eq(orders.id, orderId))
          .limit(1);

        if (order && order.status !== "paid") {
          // 2. Update the order as paid
          await db
            .update(orders)
            .set({ status: "paid" })
            .where(eq(orders.id, orderId));

          // 3. Get the membership that's been bought (in this case, the order has the total, but we need ID for the subscription)
          // We know there's only one item:
          const { orderItems } = await import("../db/schema.js"); // dinamic import so it's easier to understand
          const [item] = await db
            .select()
            .from(orderItems)
            .where(eq(orderItems.orderId, orderId))
            .limit(1);

          if (item) {
            // 4. Cancel previous subscriptions from this user
            await db
              .update(subscriptions)
              .set({ status: "cancelled" })
              .where(eq(subscriptions.userId, order.userId));

            // 5. Insert the new active subscription
            await db.insert(subscriptions).values({
              id: crypto.randomUUID(),
              userId: order.userId,
              membershipId: item.membershipId,
              status: "active",
            });

            console.log(
              `Order ${orderId} marked as paid and subscription created.`,
            );
          }
        }
      } catch (dbError) {
        console.error("Database error in webhook:", dbError);
        return res.status(500).json({ error: "Database error" });
      }
    }

    // Send the received message to Stripe
    res.json({ received: true });
  },
);
