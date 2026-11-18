const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
  console.warn("PERINGATAN: GEMINI_API_KEY belum terbaca. Cek file .env");
}

module.exports = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });