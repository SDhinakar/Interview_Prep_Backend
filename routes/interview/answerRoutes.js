// ✅ Use this
const express = require("express");
const { submitAnswer, getAnswers } = require("../../controllers/interview/answerController");

const router = express.Router();

router.post("/",  submitAnswer);
router.get("/:sessionId",  getAnswers);

module.exports = router; // ✅ CommonJS compatible
