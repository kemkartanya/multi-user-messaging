import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Database connection
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool, { schema });

if (db) {
  console.log("Postgres Database connected!");
}

export default db;
