// controllers/chatController.js
import cohere from "../utils/cohereClient.js";

// export const getAIReply = async (userMessage) => {
//   try {
//     const response = await cohere.generate({
     
//       prompt: userMessage,
//       max_tokens: 100,
//       temperature: 0.7,
//     });

//     const reply = response.body.generations?.[0]?.text?.trim();
//     return reply || "Sorry, I didn’t understand that.";
//   } catch (err) {
//     console.error("❌ Cohere error:", err?.message || err);
//     return "Sorry, I’m having trouble replying right now.";
//   }
// };

// CHANGES

// export const getAIReply = async (userMessage) => {
//   try {
//     const response = await cohere.generate({
//       prompt: userMessage.message, // make sure this is a string
//       max_tokens: 100,
//       temperature: 0.7,
//     });

//     console.log("📦 Cohere raw response:", JSON.stringify(response.body, null, 2));

//     const reply = response.body.generations?.[0]?.text?.trim();
//     return reply || "Sorry, I didn’t understand that.";
//   } catch (err) {
//     console.error("❌ Cohere error:", err?.message || err);
//     return "Sorry, I’m having trouble replying right now.";
//   }
// };
// GIVING PERSONAL PROMPT
export const getAIReply = async (userMessage) => {
  try {
    const prompt = `
   You are a helpful and friendly customer support assistant for Cosmetica, an e-commerce website that sells jeans,Tshirt and clothing product.

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
