const BLOCKED = [
  /ignore (all )?(previous|prior) instructions/i,
  /abaikan (semua )?(instruksi|perintah|aturan)/i,
  /lupakan (semua )?(instruksi|aturan)/i,
  /(system prompt|instruksi sistem)/i,
];

module.exports = (req, res, next) => {
  const message = req.body && req.body.message;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ success: false, message: "Pesan tidak boleh kosong" });
  }
  if (message.length > 500) {
    return res.status(400).json({ success: false, message: "Pesan maksimal 500 karakter" });
  }
  if (BLOCKED.some((r) => r.test(message))) {
    return res.status(400).json({ success: false, message: "Pesan tidak diizinkan" });
  }

  req.body.message = message.trim();
  next();
};