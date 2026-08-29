const User = require("../models/User");
const LearningPath = require("../models/LearningPath");
const { getResourcesForSkills, } = require("../data/resourceCatalog");
const { analyzeLearner, chatWithAI, reassessLearningPath, } = require("../services/aiServices");
const { verifyResources } = require("../utils/verifyResources");
const Progress = require("../models/Progress");
const Feedback = require("../models/Feedback");

const generateLearningPath = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const aiResult = await analyzeLearner(user);

    const modules = aiResult.roadmap.map((module, index) => ({
        title: module.title,
        description: module.description,
        skills: module.skills || [],
        prerequisites: module.prerequisites || [],
        estimatedHours: module.estimatedHours || 0,
        reason: module.reason || "",
        learningMaterial: {
              overview: module.learningMaterial?.overview || "",
              concepts: module.learningMaterial?.concepts || [],
              example: module.learningMaterial?.example || "",
              keyTakeaways: module.learningMaterial?.keyTakeaways || [],
          },
        practiceTask: module.practiceTask || "",
        resources: getResourcesForSkills(module.skills || []),
        assessment: {
            title: module.assessment?.title || "Module Assessment",
            questions: module.assessment?.questions || [],
        },
        completed: false,
        order: index + 1,
    }));

    const learningPath = await LearningPath.create({
      user: user._id,
      goal: user.goal,
      title: `Personalized Path: ${user.goal}`,
      description: aiResult.summary,
      skillGaps: aiResult.skillGaps.map((gap) => gap.skill),
      modules,
      overallProgress: 0,
    });

    res.status(201).json({
      success: true,
      learningPath,
      analysis: {
        summary: aiResult.summary,
        skillGaps: aiResult.skillGaps,
      },
    });

  } catch (error) {
    console.error("AI generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate learning path",
      error: error.message,
    });
  }
};

const chat = async (req, res) => {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: "userId and message are required",
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const learningPath = await LearningPath.findOne({
            user: userId,
        }).sort({ createdAt: -1 });

        if (!learningPath) {
            return res.status(404).json({
                success: false,
                message: "Learning path not found",
            });
        }

        const Progress = require("../models/Progress");
        const progress = await Progress.find({
            user: userId,
            learningPath: learningPath._id,
        });

        const answer = await chatWithAI({
            user,
            learningPath,
            progress,
            message,
        });

        res.json({
            success: true,
            answer,
        });

    } catch (error) {
        console.error("AI chat error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get AI response",
            error: error.message,
        });
    }
};

const reassess = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const learningPath = await LearningPath.findOne({
      user: userId,
    }).sort({ createdAt: -1 });

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      });
    }
    const progress = await Progress.find({
      user: userId,
      learningPath: learningPath._id,
    });
    const feedback = await Feedback.find({
      user: userId,
      learningPath: learningPath._id,
    }).sort({ createdAt: -1 });
    const recommendation = await reassessLearningPath({
      user,
      learningPath,
      progress,
      feedback,
    });
    res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error("AI reassessment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reassess learning path",
      error: error.message,
    });
  }
};

module.exports = {
  generateLearningPath,
  chat,
  reassess,
};