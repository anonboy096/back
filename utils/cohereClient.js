// utils/cohereClient.js
import dotenv from "dotenv";
dotenv.config();
const { default: cohere } = await import("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);
export default cohere;
