const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
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

        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        completedAt: {
            type: Date,
            default: null,
        },

        taskCompleted: {
            type: Boolean,
            default: false,
        },

        taskCompletedAt: {
            type: Date,
            default: null,
        },

        score: {
            type: Number,
            min: 0,
            max: 100,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Progress", progressSchema);