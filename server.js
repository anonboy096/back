import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatRoutes from "./routes/chatRoutes.js"; // note the `.js` extension

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

app.use("/", (req, res) => {
    res.send("Hello world");
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send_message", (data) => {
        console.log("Received message", data);

        const reply = {
            username: "Support Bot",
            message: `You said "${data.message}"`
        };

        io.emit("receive_message", reply);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

chatRoutes(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
