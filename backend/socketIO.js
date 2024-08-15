import { Server } from "socket.io";

export function setUpSocketIO(server) {
  // socket.io setup
  const io = new Server(server, {
    pingTimeout: 60000,
    transports: ["polling"],
    cors: {
      origin: ["http://localhost:5173", "http://localhost:8000"],
      methods: "GET, POST, PUT, DELETE",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io", socket.id);
  });
}
