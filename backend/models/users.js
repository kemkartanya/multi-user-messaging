import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export default users;
