import express from "express";
import {
  getAllMessages,
  getMessForUser,
  sendMess,
} from "../controllers/messages.js";

const router = express.Router();

router.post("/", sendMess);
router.get("/", getAllMessages);
router.get("/:userId", getMessForUser);

export default router;
