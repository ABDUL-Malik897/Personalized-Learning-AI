const Progress = require("../models/Progress");

const createProgress = async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    res.status(201).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress record not found",
      });
    }
    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.params.userId,
    });
    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProgress,
  updateProgress,
  getUserProgress,
};