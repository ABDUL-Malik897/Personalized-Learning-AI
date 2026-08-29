const mongoose = require("mongoose");

const learningResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["Course", "Article", "Video", "Project", "Assessment"],
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    estimatedHours: {
      type: Number,
      default: 1,
    },

    url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LearningResource",
  learningResourceSchema
);