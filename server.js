require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

const app = express();

// ✅ Fixed CORS middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

const answerRoutes = require("./routes/interview/answerRoutes");
app.use("/api/interview/answers", answerRoutes);
const interviewQuestionRoutes = require("./routes/interview/questionRoutes"); // ✅ new one
app.use("/api/interview/questions", interviewQuestionRoutes); // ✅ new route
const sroutes = require("./routes/interview/sessionRoutes"); // ✅ import
app.use("/api/sessions", sessionRoutes);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
