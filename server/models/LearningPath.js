const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        goal: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        skillGaps: {
            type: [String],
            default: [],
        },

        modules: [
            {
                title: {
                    type: String,
                    required: true,
                },

                description: {
                    type: String,
                    default: "",
                },

                skills: {
                    type: [String],
                    default: [],
                },

                prerequisites: {
                    type: [String],
                    default: [],
                },

                estimatedHours: {
                    type: Number,
                    default: 1,
                },

                reason: {
                    type: String,
                    default: "",
                },

                completed: {
                    type: Boolean,
                    default: false,
                },

                order: {
                    type: Number,
                    required: true,
                },

                learningMaterial: {
                    overview: {
                        type: String,
                        default: "",
                    },

                    concepts: [
                        {
                            title: {
                                type: String,
                                default: "",
                            },

                            explanation: {
                                type: String,
                                default: "",
                            },
                        },
                    ],

                    example: {
                        type: String,
                        default: "",
                    },

                    keyTakeaways: {
                        type: [String],
                        default: [],
                    },
                },

                practiceTask: {
                    type: String,
                    default: "",
                },

                assessment: {
                    title: {
                        type: String,
                        default: "Module Assessment",
                    },

                    questions: [
                        {
                            question: {
                                type: String,
                                required: true,
                            },

                            options: {
                                type: [String],
                                default: [],
                            },

                            correctAnswer: {
                                type: Number,
                                required: true,
                            },

                            explanation: {
                                type: String,
                                default: "",
                            },
                        },
                    ],
                },

                resources: [
                    {
                        title: {
                            type: String,
                            default: "",
                        },

                        description: {
                            type: String,
                            default: "",
                        },

                        url: {
                            type: String,
                            default: "",
                        },

                        type: {
                            type: String,
                            default: "Resource",
                        },
                    },
                ],
            },
        ],

        overallProgress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("LearningPath", learningPathSchema);