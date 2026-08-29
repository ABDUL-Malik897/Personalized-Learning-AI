const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    learningPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningPath",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Too Easy",
        "Too Difficult",
        "Not Relevant",
        "Learning Preference",
        "Time Constraint",
        "General",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);