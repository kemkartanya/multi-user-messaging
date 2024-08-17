import { eq } from "drizzle-orm";
import db from "../db.js";
import { users } from "../schema.js";

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
