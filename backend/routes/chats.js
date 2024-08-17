import express from "express";
import { accessChat, fetchChats, updateChat } from "../controllers/chats.js";

const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchChats);
router.patch("/:id", updateChat);

export default router;
