// ====== controllers/interview/answerController.js ======
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require("dotenv");
const UserAnswer = require("../../models/UserAnswer");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const generationConfig = { temperature: 1, topP: 0.95, topK: 40, maxOutputTokens: 2048, responseMimeType: "text/plain" };
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const submitAnswer = async (req, res) => {
  try {
    const { mockIdRef, question, user_ans, correct_ans } = req.body;
    const userId = req.body.userId || "testUser123";
    if (!mockIdRef || !question || !user_ans) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `
Compare the following answers and rate the user response from 1 to 10.

Return ONLY a valid JSON object in this format:

{
  "feedback": "Your answer is accurate but lacks depth.",
  "rating": 8
}

User Answer: ${user_ans}

Ideal Answer: ${correct_ans}
`;

    const chat = model.startChat({ generationConfig, safetySettings });
    const result = await chat.sendMessage(prompt);
    const text = result.response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
      if (!parsed.feedback || typeof parsed.rating !== "number") {
        throw new Error("Missing fields");
      }
    } catch (err) {
      // console.warn("⚠️ Failed to parse Gemini response, using fallback regex.");
      const match = text.match(/"feedback"\s*:\s*"([^"]+?)"\s*,\s*"rating"\s*:\s*(\d+)/i);
      if (match) {
        parsed = {
          feedback: match[1],
          rating: parseInt(match[2]),
        };
      } else {
        parsed = {
          feedback: text.trim(),
          rating: 0, // fallback
        };
      }
    }



    const newAnswer = await UserAnswer.create({
      userId,
      mockIdRef,
      question,
      user_ans,
      correct_ans,
      feedback: parsed.feedback,
      rating: parsed.rating,
    });

    // console.log("[✔] Answer stored:", newAnswer);
    res.status(200).json(newAnswer);
  } catch (error) {
    // console.error("[❌] Error in submitAnswer:", error);
    res.status(500).json({ error: "Failed to process answer" });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.query.userId || "testUser123";
    const answers = await UserAnswer.find({ mockIdRef: sessionId, userId }); // ✅ This is correct
    // console.log("🔍 Getting answers for session:", sessionId, "user:", userId);
    res.status(200).json(answers);
  } catch (err) {
    // console.error("[❌] Error getting answers:", err);
    res.status(500).json({ error: "Could not fetch answers" });
  }
};

module.exports = { submitAnswer, getAnswers };
