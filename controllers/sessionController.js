const Session = require('../models/Session');
const Question = require('../models/Question');
const asyncHandler = require('express-async-handler');

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = asyncHandler(async (req, res) => {
    try {
        const { role, experience, topicToFocus, description, questions } = req.body;


        if (!role || !experience || !topicToFocus) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const session = await Session.create({
            userId: req.user._id, // Using _id from auth middleware
            role,
            experience,
            topicToFocus,
            description,
            questions: [], // Initialize empty, will be populated with question IDs
        });


        if (questions && Array.isArray(questions)) {

            const questionDocs = await Promise.all(
                questions.map(async (q, i) => {
                    try {

                        if (!q?.question || !q?.answer) {
                            // console.warn(`⛔ Skipping invalid question at index ${i}`, q);
                            return null;
                        }

                        const questionDoc = await Question.create({
                            question: q.question,
                            session: session._id,
                            answer: q.answer,
                        });

                        return questionDoc._id;
                    } catch (err) {
                        // console.error(`❌ Error creating question at index ${i}:`, err);
                        throw new Error(`Failed to create question: ${err.message}`);
                    }
                })
            );

            const validQuestionIds = questionDocs.filter(Boolean);

            session.questions = validQuestionIds;
            await session.save();

            // console.log("Session updated with questions successfully");
        }

        res.status(201).json({
            success: true,
            session
        });
    } catch (error) {
        // console.error('Error in createSession:', error);
        res.status(500).json({
            message: "Error creating session",
            error: error.message
        });
    }
});

// @desc    Get all sessions for a user
// @route   GET /api/sessions
// @access  Private
exports.getSessions = asyncHandler(async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user._id })
            .populate('questions')
            .sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        // console.error('Error in getSessions:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// @desc    Get single session
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = asyncHandler(async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options: { sort: { createdAt: 1, isPinned: -1 } },
            })
            .exec();

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }


        res.status(200).json({ success: true, session });
    } catch (error) {
        // console.error('Error in getSessionById:', error);
        res.status(500).json({
            message: "Error fetching session",
            error: error.message
        });
    }
});

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = asyncHandler(async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }


        await Question.deleteMany({ session: session._id });
        await session.deleteOne();


        res.status(200).json({ success: true, message: "Session deleted successfully" });
    } catch (error) {
        // console.error('Error in deleteSession:', error);
        res.status(500).json({
            message: "Error deleting session",
            error: error.message
        });
    }
});  