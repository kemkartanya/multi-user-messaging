import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { setUpSocketIO } from "./socketIO.js";

import usersRoute from "./routes/users.js";
import messRoute from "./routes/messages.js";
import chatRoute from "./routes/chats.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/messages", messRoute);
app.use("/api/v1/chats", chatRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setUpSocketIO(server);
