// ✅ Use this
const express = require("express");
const { submitAnswer, getAnswers } = require("../../controllers/interview/answerController");
const { protect } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, submitAnswer);
router.get("/:sessionId", protect, getAnswers);

module.exports = router; // ✅ CommonJS compatible
