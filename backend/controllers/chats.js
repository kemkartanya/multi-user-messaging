import { eq, and, or } from "drizzle-orm";
import db from "../db.js";
import { chats, users, messages } from "../schema.js";

// Create or fetch One to One Chat
export const accessChat = async (req, res) => {
  const user1 = 2; //req.user.id;
  const user2 = req.body.user2;

  if (!user1 || !user2) {
    console.log("users are required to access chat");
    return res
      .status(400)
      .json({ success: false, error: "users are required to access chat" });
  }

  try {
    const otherUser = await db.select().from(users).where(eq(users.id, user2));

    if (otherUser.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "user2 doesn't exist" });
    }

    const isChat = await db
      .select()
      .from(chats)
      .where(
        or(
          and(eq("user1", user1), eq("user2", user2)),
          and(eq("user1", user2), eq("user2", user1))
        )
      );

    if (isChat.length === 0) {
      const newChat = await db
        .insert(chats)
        .values({ user1: user1, user2: user2 })
        .returning();

      newChat[0].otherUser = otherUser[0];
      return res.status(201).json(newChat[0]);
    } else {
      isChat[0].otherUser = otherUser[0];
      return res.status(201).json(isChat[0]);
    }
  } catch (error) {
    console.error("Error accessing chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all chats for a user
export const fetchChats = async (req, res) => {
  const filter = req.query.filter || "";

  // req.user.id = 2;

  try {
    const results = await db
      .select()
      .from(chats)
      .where(or(eq(chats.user1, 2), eq(chats.user2, 2)));

    for (const result of results) {
      if (result.user1 === 2) {
        const otherUser = await db
          .select()
          .from(users)
          .where(eq(users.id, result.user2));
        result.otherUser = otherUser[0];
      } else {
        const otherUser = await db
          .select()
          .from(users)
          .where(eq(users.id, result.user1));
        result.otherUser = otherUser[0];
      }

      if (result.latestMessageId) {
        const latestMessage = await db
          .select()
          .from(messages)
          .where(eq(messages.id, result.latestMessageId));
        result.latestMessage = latestMessage[0];

        const sender = await db
          .select()
          .from(users)
          .where(eq(users.id, latestMessage[0].senderId));
        result.latestMessage.sender = sender[0];
      }
    }

    if (filter === "archived") {
      return res.json(results.filter((chat) => chat.archived));
    } else if (filter === "blocked") {
      return res.json(results.filter((chat) => chat.blocked));
    }

    return res.json(results);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update chat
export const updateChat = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedChat = await db
      .update(chats)
      .set(req.body)
      .where(eq("id", id))
      .returning()
      .run();

    res.status(200).json({
      success: true,
      message: "Successfully updated chat",
      data: updatedChat,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to update", error: error });
  }
};
