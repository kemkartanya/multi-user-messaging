import db from "../db.js";
import { users } from "../schema.js";
import { eq, like, not, and } from "drizzle-orm";

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // if username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser.length) {
      if (existingUser[0].password === password) {
        return res.json(existingUser[0]);
      }

      return res.status(400).json({
        error:
          "Username already exists! Either choose new username or enter correct password",
      });
    }

    const newUser = await db
      .insert(users)
      .values({ username, password })
      .returning();
    res.json(newUser[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const allUsers = async (req, res) => {
  const userId = req.params.userId;
  const { search: keyword } = req.query;

  try {
    const allUsers = await db
      .select()
      .from(users)
      .where(
        and(like(users.username, `%${keyword}%`), not(eq(users.id, userId)))
      );

    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};
