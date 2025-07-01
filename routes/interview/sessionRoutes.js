// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessionById,
  getAllSessionsByUser,
  deleteSession
} = require("../../controllers/sessionController");
const { protect } = require("../../middlewares/authMiddleware");

// ✅ Get session by ID
router.get("/:sessionId", protect, getSessionById);

// ✅ Create new session with custom ID
router.post("/create", protect, createSession);

module.exports = router;
