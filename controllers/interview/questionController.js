const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const generateQuestions = async (req, res) => {
  try {
    const { role = '', topics = '', experience = '' } = req.body;
    // Compose a detailed prompt using all details
    const prompt = `Generate 5 concise interview questions for a ${role} with ${experience} experience. Cover the following topics: ${topics}. For each, also provide a model answer. Format as JSON: [{"question": "...", "answer": "..."}]`;
    let text = "";
    try {
      const chat = model.startChat({ generationConfig, safetySettings });
      const result = await chat.sendMessage(prompt);
      text = result.response.text();
      // console.log("Gemini raw response:", text);
    } catch (err) {
      console.log("Gemini API error:", err);
      text = "";
    }
    let questionsWithAnswers = [];
    try {
      questionsWithAnswers = JSON.parse(text);
    } catch (e) {
      const match = text.match(/\[.*\]/s);
      if (match) {
        try {
          questionsWithAnswers = JSON.parse(match[0]);
        } catch (e2) {
          const questions = text
            .split('\n')
            .filter((q) => q.trim().length > 10 && !q.includes("interview questions"));
          const idealAnswers = questions.map(() => "");
          if (questions.length === 0) {
            return res.status(200).json({
              questions: [
                "What is React?",
                "Explain the virtual DOM.",
                "What are hooks in React?",
                "How do you manage state in React?",
                "What is the purpose of keys in lists?"
              ],
              idealAnswers: ["", "", "", "", ""]
            });
          }
          return res.status(200).json({ questions, idealAnswers });
        }
      } else {
        const questions = text
          .split('\n')
          .filter((q) => q.trim().length > 10 && !q.includes("interview questions"));
        const idealAnswers = questions.map(() => "");
        if (questions.length === 0) {
          return res.status(200).json({
            questions: [
              "What is React?",
              "Explain the virtual DOM.",
              "What are hooks in React?",
              "How do you manage state in React?",
              "What is the purpose of keys in lists?"
            ],
            idealAnswers: ["", "", "", "", ""]
          });
        }
        return res.status(200).json({ questions, idealAnswers });
      }
    }
    const questions = questionsWithAnswers.map(q => q.question);
    const idealAnswers = questionsWithAnswers.map(q => q.answer);
    res.status(200).json({ questions, idealAnswers });
  } catch (error) {
    res.status(200).json({
      questions: [
        "What is React?",
        "Explain the virtual DOM.",
        "What are hooks in React?",
        "How do you manage state in React?",
        "What is the purpose of keys in lists?"
      ],
      idealAnswers: ["", "", "", "", ""]
    });
  }
};

module.exports = { generateQuestions };
