const express = require("express");
const { generateQuestions } = require("../../controllers/interview/questionController");
const { protect } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, generateQuestions);

module.exports = router;
