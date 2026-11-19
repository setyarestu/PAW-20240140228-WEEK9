const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateDeskripsiAcara({
  judul,
  tanggal,
  lokasi,
  pembicara,
  target_peserta,
  gaya_bahasa = "Formal",
}) {
  const gaya = gaya_bahasa === "Santai" ? "Santai" : "Formal";

  const prompt = `
Buatkan deskripsi acara dalam Bahasa Indonesia dengan gaya bahasa ${gaya}.
Gunakan HANYA informasi berikut dan jangan mengarang fakta baru di luar data ini:
- Judul Acara: ${judul}
- Tanggal: ${tanggal}
- Lokasi: ${lokasi}
- Pembicara: ${pembicara}
- Target Peserta: ${target_peserta}

Tulis deskripsi yang jelas, informatif, dan menarik untuk dipublikasikan.
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { generateDeskripsiAcara };