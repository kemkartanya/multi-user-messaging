import express from "express";
import { accessChat, fetchChats, updateChat } from "../controllers/chats.js";

const router = express.Router();

router.post("/:userId", accessChat);
router.get("/:userId", fetchChats);
router.patch("/:id", updateChat);

export default router;
