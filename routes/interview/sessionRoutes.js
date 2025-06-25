// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessionById,
  getAllSessionsByUser,
  deleteSession
} = require("../../controllers/sessionController");

// ✅ Get session by ID
router.get("/:sessionId", getSessionById);

// ✅ Create new session with custom ID
router.post("/create", createSession);

module.exports = router;
