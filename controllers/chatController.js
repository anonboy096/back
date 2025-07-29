// controllers/chatController.js
import cohere from "../utils/cohereClient.js";

// AI reply logic
export const getAIReply = async (userMessage) => {
  try {
    const prompt = `
You are a helpful and friendly customer support assistant for Cosmetica, an e-commerce website that sells jeans, Tshirts, and clothing products.

Your job is to assist customers with questions related to:
- Order status
- Returns and refunds
- Payment issues
- Product availability
- Shipping and delivery
- Customer care contact info (Phone: 09998732)

Always provide accurate, Cosmetica-specific answers. If someone asks for customer care, tell them the phone number. Keep your tone polite and helpful.

User: ${userMessage.message}
Support Bot:
    `;

    const response = await cohere.generate({
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    const reply = response.body.generations?.[0]?.text?.trim();
    return reply || "Sorry, I didn’t understand that.";
  } catch (err) {
    console.error("❌ Cohere error:", err?.message || err);
    return "Sorry, I’m having trouble replying right now.";
  }
};

// ✅ This is the missing part!
export const handleMessage = async (socket, data) => {
  const reply = await getAIReply(data);
  socket.emit("receive_message", {
    username: "Support Bot",
    message: reply,
  });
};
