import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "./index";

async function runMigrations() {
  try {
    await migrate(db, {
      migrationsFolder: "./drizzle",
    });
  } catch (err) {
    console.error("Migration failed", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
