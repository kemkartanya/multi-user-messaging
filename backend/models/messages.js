import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import users from "./users.js";

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: serial("sender_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export default messages;
