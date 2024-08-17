import { eq } from "drizzle-orm";
import db from "../db.js";
import { chats } from "../schema.js";

// Create or fetch One to One Chat
export const accessChat = async (req, res) => {
  const user1 = req.user.id;
  const user2 = req.body.user2;

  if (!user1 || !user2) {
    console.log("users are required to access chat");
    return res
      .status(400)
      .json({ success: false, error: "users are required to access chat" });
  }

  try {
    let isChat = await db
      .select(chats)
      .where(eq("user1", user1))
      .and(eq("user2", user2))
      .run();

    if (isChat.length === 0) {
      const newChat = await db
        .insert(chats)
        .values({ user1: user1, user2: user2 })
        .returning();
      return res.json(newChat[0]);
    } else {
      return res.json(isChat[0]);
    }
  } catch (error) {
    console.error("Error accessing chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all chats for a user
export const fetchChats = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const results = await db
      .select(chats)
      .where(eq("user1", req.user.id).or(eq("user2", req.user.id)))
      .run();

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
