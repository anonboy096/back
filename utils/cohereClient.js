// utils/cohereClient.js
import dotenv from "dotenv";
dotenv.config();
const { default: cohere } = await import("cohere-ai");
cohere.init("pmAHUVEnKizTqGvM4lm07AkugT2FWLRDGPvVrMyx");
export default cohere;
