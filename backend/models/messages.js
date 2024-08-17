import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import users from "./users.js";
import chats from "./chats.js";

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: serial("sender_id").references(() => users.id),
  content: text("content").notNull(),
  chatId: serial("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  readByRecipient: boolean("read_by_recipient").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export default messages;
