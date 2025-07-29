import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import handleSocketConnection from "./sockets/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or "http://localhost:5173" if using Vite frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
// Will run when client connects
io.on("connection", (socket) => {
  handleSocketConnection(socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
