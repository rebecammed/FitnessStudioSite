import { webcrypto } from "node:crypto";
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { trainersRouter } from "./routes/trainers.js";
import { classesRouter } from "./routes/classes.js";
import { membershipsRouter } from "./routes/memberships.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173/FitnessStudioSite",
    credentials: true,
  }),
);
// better-auth needs the raw request body, so it's mounted before express.json().
app.all("/api/auth/*splat", toNodeHandler(auth));
// Parses incoming JSON requests so the API can read the body. Express built-in middleware
app.use(express.json());
// My routes
app.use("/api/trainers", trainersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/memberships", membershipsRouter);
// This returns the actual timestamp to check if the server is alive
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
// 404 ERROR if the route doesn't exist
app.use("/api/*splat", (_req, res) => {
  res.status(404).json({ error: "No such endpoint" });
});
// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something broke on our side." });
});
// Start the server on the PORT
app.listen(PORT, () => {
  console.log(`FitnessStudio API listening on http://localhost:${PORT}`);
});
