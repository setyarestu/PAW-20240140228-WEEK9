const router = require("express").Router();
const validateChatInput = require("../middlewares/validateChatInput");
const { chat } = require("../controllers/chat.controller");

router.post("/chat", validateChatInput, chat);

module.exports = router;