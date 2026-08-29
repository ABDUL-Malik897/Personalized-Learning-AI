const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({
      success: true,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getUserFeedback,
};