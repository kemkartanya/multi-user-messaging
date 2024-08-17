import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./db.js";
import { pool } from "./db.js";

await migrate(db, {
  migrationsFolder: "./drizzle",
  migrationsTable: "my_migrations",
});

await pool.end();
