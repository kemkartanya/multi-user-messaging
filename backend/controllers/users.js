import db from "../db.js";
import { users } from "../schema.js";
import { eq, like } from "drizzle-orm";

export const createUser = async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await db.insert(users).values({ username }).returning();
    res.json(newUser[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const allUsers = async (req, res) => {
  const { search: keyword } = req.query;

  try {
    const allUsers = await db
      .select()
      .from(users)
      .where(like(users.username, `%${keyword}%`));

    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
