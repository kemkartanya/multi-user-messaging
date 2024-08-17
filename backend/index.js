import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
import bodyParser from "body-parser";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { setUpSocketIO } from "./socketIO.js";

import usersRoute from "./routes/users.js";
import messRoute from "./routes/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/messages", messRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setUpSocketIO(server);
