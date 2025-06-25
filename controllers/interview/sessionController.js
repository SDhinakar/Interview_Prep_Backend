// controllers/sessionController.js
const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const { sessionId, userId, role, experience, topicToFocus, description } = req.body;

    if (!sessionId || !userId || !role || !experience || !topicToFocus) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Session.findById(sessionId);
    if (existing) {
      return res.status(200).json({ session: existing });
    }

    const session = await Session.create({
      _id: sessionId,
      userId,
      role,
      experience,
      topicToFocus,
      description,
    });

    res.status(201).json({ session });
  } catch (err) {
    // console.error("Session creation error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
