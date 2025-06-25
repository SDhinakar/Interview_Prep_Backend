
const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  userId: String,
  mockIdRef: String,
  question: String,
  user_ans: String,
  correct_ans: String,
  feedback: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserAnswer", userAnswerSchema);