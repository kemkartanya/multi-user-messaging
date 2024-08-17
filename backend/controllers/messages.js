import { eq } from "drizzle-orm";
import db from "../db.js";
import { messages } from "../schema.js";

export const sendMess = async (req, res) => {
  const { senderId, content } = req.body;
  try {
    const newMessage = await db
      .insert(messages)
      .values({ senderId, content })
      .returning();
    res.json(newMessage[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending message" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const allMessages = await db.select().from(messages);
    res.json(allMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

export const getMessForUser = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const userMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.senderId, userId));
    res.json(userMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching user messages" });
  }
};
