import { pgTable, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import users from "./users.js";
import messages from "./messages.js";

const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  user1: serial("user1")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  user2: serial("user2")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  latestMessageId: serial("latest_message_id").references(() => messages.id),
  archived: boolean("archived").default(false),
  blocked: boolean("blocked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export default chats;
