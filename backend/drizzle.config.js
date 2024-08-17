import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';


dotenv.config();

// export default {
//   schema: "./schema.js",
//   out: "./drizzle",
//   driver: "pg",
//   dialect: "pg",
//   dbCredentials: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   },
// };


export default defineConfig({
    schema: './schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });