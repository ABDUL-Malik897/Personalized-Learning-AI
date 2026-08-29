const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },

        email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        },

        goal: {
        type: String,
        default: "",
        },

        experienceLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
        },

        interests: {
        type: [String],
        default: [],
        },

        skills: {
            type: [String],
            default: [],
        },

        completedCourses: {
            type: [String],
            default: [],
        },

        learningPreference: {
        type: String,
        enum: ["Video", "Reading", "Project Based", "Mixed"],
        default: "Mixed",
        },

        weeklyHours: {
        type: Number,
        default: 5,
        },

        googleUid: {
            type: String,
            unique: true,
            sparse: true,
        },

        onboardingCompleted: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);