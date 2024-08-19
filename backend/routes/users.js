import express from "express";
import { allUsers, createUser } from "../controllers/users.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", allUsers);

export default router;
