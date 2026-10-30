import { Router } from "express";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, orderItems, memberships } from "../db/schema.js";
import { auth } from "../auth.js";
import { stripe } from "../lib/stripe.js";

export const checkoutRouter = Router();

checkoutRouter.post("/", async (req, res) => {
  try {
    // 1. Check the session (authentication middleware)
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { membershipId } = req.body;
    if (!membershipId)
      return res.status(400).json({ error: "Missing membershipId" });

    // 2. Get the real price from the db
    const [membership] = await db
      .select()
      .from(memberships)
      .where(eq(memberships.id, membershipId))
      .limit(1);

    if (!membership)
      return res.status(404).json({ error: "Membership not found" });

    // 3. Insert the order in the db with status 'pending'
    const orderId = randomUUID();
    await db.insert(orders).values({
      id: orderId,
      userId: session.user.id,
      total: membership.price,
      status: "pending",
    });

    // 4. Insert the order item
    await db.insert(orderItems).values({
      id: randomUUID(),
      orderId: orderId,
      membershipId: membership.id,
      price: membership.price,
    });

    // 5. Create the Stripe Checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: membership.name,
              description: `PULSO Studio - ${membership.name} Membership`,
            },
            unit_amount: membership.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?order_id=${orderId}`,
      // Cámbialo a esto:
      cancel_url: `${process.env.CLIENT_URL}/?payment=cancelled#pricing`,
      client_reference_id: orderId, // To identify the order in the webhook
      customer_email: session.user.email,
    });

    // 6. Return Stripe url to the client
    res.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// GET: Check the status of an order
checkoutRouter.get("/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Return only the status to prevent exposing vulnerable data
    res.json({ status: order.status });
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({ error: "Failed to check order status" });
  }
});
