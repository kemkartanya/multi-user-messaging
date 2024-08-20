import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { eq } from "drizzle-orm";
import db from "./db.js";
import { chats } from "./schema.js";
import usersRoute from "./routes/users.js";
import messRoute from "./routes/messages.js";
import chatRoute from "./routes/chats.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/messages", messRoute);
app.use("/api/v1/chats", chatRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", async (newMessageRecieved) => {
    var chatId = newMessageRecieved.chatId;
    if (!chatId) return console.log("chatId not defined");

    var chat = await db.select().from(chats).where(eq(chats.id, chatId));
    chat = chat[0];
    if (!chat) return console.log("chat not found");

    if (!chat.user1 || !chat.user2)
      return console.log("chat.user1 or chat.user2 not defined");

    if (chat.user1 === newMessageRecieved.senderId) {
      socket.in(chat.user2).emit("message recieved", newMessageRecieved);
    } else {
      socket.in(chat.user1).emit("message recieved", newMessageRecieved);
    }
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData.id);
  });
});
