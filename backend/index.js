import express from "express";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { setUpSocketIO } from "./socketIO.js";

const { Pool } = pkg;

dotenv.config();

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool);

if (db) {
  console.log("Postgres Database connected!");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Run migrations
const runMigrations = async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
};

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setUpSocketIO(server);
