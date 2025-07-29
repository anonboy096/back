import { getAIReply } from "../controllers/chatController.js";

const handleSocketConnection = (socket) => {
  console.log("🟢 User connected:", socket.id);

  // socket.on("userMessage", async (message) => {
  //   console.log("📩 User says:", message);

  //   const aiReply = await getAIReply(message);
  //   socket.emit("aiReply", aiReply);
  // });
  // CHANGES
  socket.on("userMessage", async (message) => {
  console.log("📩 User says:", message);

  const aiReply = await getAIReply(message);
// Sends  a message back to our client 
  socket.emit("receive_message", {
    username: "Support Bot",
    message: aiReply,
  });
});


  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
};

export default handleSocketConnection;
