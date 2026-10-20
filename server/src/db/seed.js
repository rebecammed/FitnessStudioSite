import { db } from "./index.js";
import { trainers, classes, memberships } from "./schema.js";
import { trainersData } from "./trainers.data.js";
import { classesData } from "./classes.data.js";
import { membershipsData } from "./memberships.data.js";

async function seed() {
  console.log("Seeding database...");

  // 1. Insert Trainers (Independent)
  for (const t of trainersData) {
    await db.insert(trainers).values(t).onConflictDoNothing();
  }

  // 2. Insert Memberships (Independent)
  for (const m of membershipsData) {
    await db.insert(memberships).values(m).onConflictDoNothing();
  }

  // 3. Insert Classes (Related to Trainers)
  for (const c of classesData) {
    await db.insert(classes).values(c).onConflictDoNothing();
  }

  console.log(
    `Done — seeded ${trainersData.length} trainers, ${membershipsData.length} memberships, and ${classesData.length} classes.`,
  );
  process.exit(0);
}

seed().catch(console.error);
