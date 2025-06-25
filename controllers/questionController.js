const Question = require('../models/Question');
const Session = require('../models/Session');
const asyncHandler = require('express-async-handler');

// @desc    Add question to session
// @route   POST /api/questions/add
// @access  Private
const addQuestionToSession = asyncHandler(async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                success: false,
                message: "Please provide sessionId and questions array"
            });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        // Check if user owns the session
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to modify this session"
            });
        }

        // Normalize and filter out duplicate questions
        const normalizedInputQuestions = questions.map(q => ({
            ...q,
            normalized: q.question.trim().toLowerCase()
        }));

        // Fetch existing questions for the session
        const existingQuestions = await Question.find({ session: sessionId });
        const existingNormalized = new Set(
            existingQuestions.map(q => q.question.trim().toLowerCase())
        );

        // Filter out duplicates
        const uniqueQuestions = normalizedInputQuestions.filter(q => !existingNormalized.has(q.normalized));

        if (uniqueQuestions.length === 0) {
            return res.status(200).json({
                success: false,
                message: "All provided questions are duplicates. No new questions were added."
            });
        }

        // Create new questions
        const createdQuestions = await Question.insertMany(
            uniqueQuestions.map(q => ({
                question: q.question,
                session: sessionId,
                answer: q.answer || "",
                note: q.note || ""
            }))
        );

        // Add question IDs to session
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

        res.status(201).json({
            success: true,
            message: "Questions added to session",
            questions: createdQuestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding questions",
            error: error.message
        });
    }
});

// @desc    Toggle pin status of a question
// @route   POST /api/questions/:id/pin
// @access  Private
const togglePinQuestion = asyncHandler(async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Get session to check ownership
        const session = await Session.findById(question.session);
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to modify this question"
            });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.json({
            success: true,
            message: "Question pin status updated",
            question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating question pin status",
            error: error.message
        });
    }
});

// @desc    Update question note
// @route   POST /api/questions/:id/note
// @access  Private
const updateQuestionNote = asyncHandler(async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Get session to check ownership
        const session = await Session.findById(question.session);
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to modify this question"
            });
        }

        question.note = note || "";
        await question.save();

        res.json({
            success: true,
            message: "Question note updated",
            question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating question note",
            error: error.message
        });
    }
});

module.exports = {
    addQuestionToSession,
    togglePinQuestion,
    updateQuestionNote
};