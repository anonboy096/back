import { handleMessage } from "../controllers/chatController.js";

function socketRoutes(io) {
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        socket.on("userMessage", (data) => {
            handleMessage(socket, data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
}

export default socketRoutes;
