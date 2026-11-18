const { askAssistant } = require("../services/gemini.service");

exports.chat = async (req, res) => {
  try {
    const reply = await askAssistant(req.body.message);
    res.json({ success: true, data: { reply } });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({
      success: false,
      message: "AI Assistant sedang bermasalah, coba lagi nanti",
    });
  }
};