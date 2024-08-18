import { eq } from "drizzle-orm";
import db from "../db.js";
import { chats, messages } from "../schema.js";

export const sendMess = async (req, res) => {
  const { senderId, content, chatId } = req.body;

  if (!senderId || !content || !chatId) {
    return res
      .status(400)
      .json({ error: "senderId, content and chatId are required" });
  }

  try {
    const newMessage = await db
      .insert(messages)
      .values({ senderId, content, chatId })
      .returning();

    // Update the latest message in the chat
    await db
      .update(chats)
      .set({ latestMessageId: newMessage[0].id })
      .where(eq(chats.id, chatId))
      .returning({ updatedId: messages.id });

    res.json(newMessage[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending message" });
  }
};

// messages for particular chatId
export const allMessages = async (req, res) => {
  const chatId = parseInt(req.params.chatId);

  try {
    const allMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId));
    res.json(allMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
