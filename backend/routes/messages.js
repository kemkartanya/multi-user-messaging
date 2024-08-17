import express from "express";
import { allMessages, sendMess } from "../controllers/messages.js";

const router = express.Router();

router.get("/:chatId", allMessages);
router.post("/", sendMess);

export default router;
