const LearningPath = require("../models/LearningPath");

const createLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.create(req.body);
    res.status(201).json({
      success: true,
      learningPath,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserLearningPaths = async (req, res) => {
  try {
    const paths = await LearningPath.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      paths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLearningPath = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found",
      });
    }
    res.json({
      success: true,
      learningPath: path,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLearningPath,
  getUserLearningPaths,
  getLearningPath,
};