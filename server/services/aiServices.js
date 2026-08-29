const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeLearner = async (profile) => {
    const prompt = `
        You are an expert AI learning-path advisor.

        Analyze the following learner profile and create a personalized
        learning strategy.

        LEARNER PROFILE:

        Name: ${profile.name}

        Goal:
        ${profile.goal}

        Experience Level:
        ${profile.experienceLevel}

        Existing Skills:
        ${profile.skills.join(", ") || "None"}

        Completed Courses:
        ${profile.completedCourses?.join(", ") || "None"}

        Interests:
        ${profile.interests.join(", ") || "None"}

        Learning Preference:
        ${profile.learningPreference}

        Available Weekly Hours:
        ${profile.weeklyHours}

        Your job is to:

        1. Understand the learner's goal.
        2. Identify the skills required to achieve that goal.
        3. Compare required skills against existing skills.
        4. Identify important skill gaps.
        5. Prioritize those gaps.
        6. Create a logical learning sequence.
        7. Recommend projects and assessments.
        8. Create one practical hands-on task for every roadmap module.
        9. Explain why each recommendation is useful.
        10. Create actual learning material for every roadmap module.
        11. Include an overview of the module.
        12. Include at least 3 important concepts with clear explanations.
        13. Include a practical example.
        14. Include 3-5 key takeaways.
        15. Adapt the depth of the material to the learner's experience level.
        16. Do not merely tell the learner what to study; actually teach the concepts.
        17. Consider the learner's completed courses and previous learning.
        18. Do not recommend teaching material they have already completed unless it is necessary as a prerequisite or brief review.
        19. Use completed learning to identify what the learner can skip.
        20. Create a short assessment for every roadmap module.
        21. Each assessment must contain 3-5 multiple-choice questions.
        22. Questions must test concepts actually taught in that module.
        23. Provide exactly 4 answer options per question.
        24. correctAnswer must be the zero-based index of the correct option.
        25. Provide a short explanation for the correct answer.
        26. Do not create trick questions.
        27. Match assessment difficulty to the learner's experience level.

        Do not assume the learner needs to learn skills they already know.
        The roadmap must be realistic for the learner's available weekly time.
    `;

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
        console.log(`AI request attempt ${attempt}/3`);
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
            
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: {
                        type: Type.STRING,
                    },
                    skillGaps: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                skill: {
                                    type: Type.STRING,
                                },
                                priority: {
                                    type: Type.STRING,
                                },
                                reason: {
                                    type: Type.STRING,
                                },
                            },
                            required: [
                                "skill",
                                "priority",
                                "reason",
                            ],
                        },
                    },
                    roadmap: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: {
                                    type: Type.STRING,
                                },
                                description: {
                                    type: Type.STRING,
                                },
                                type: {
                                    type: Type.STRING,
                                },
                                skills: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.STRING,
                                    },
                                },
                                prerequisites: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.STRING,
                                    },
                                },
                                estimatedHours: {
                                    type: Type.NUMBER,
                                },
                                reason: {
                                    type: Type.STRING,
                                },
                                learningMaterial: {
                                    type: Type.OBJECT,
                                    properties: {
                                        overview: {
                                            type: Type.STRING,
                                        },
                                        concepts: {
                                            type: Type.ARRAY,
                                            items: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    title: {
                                                        type: Type.STRING,
                                                    },
                                                    explanation: {
                                                        type: Type.STRING,
                                                    },
                                                },
                                                required: [
                                                    "title",
                                                    "explanation",
                                                ],
                                            },
                                        },
                                        example: {
                                            type: Type.STRING,
                                        },
                                        keyTakeaways: {
                                            type: Type.ARRAY,
                                            items: {
                                                type: Type.STRING,
                                            },
                                        },
                                    },
                                    required: [
                                        "overview",
                                        "concepts",
                                        "example",
                                        "keyTakeaways",
                                    ],
                                },
                                practiceTask: {
                                    type: Type.STRING,
                                },
                                resources: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: {
                                                type: Type.STRING,
                                            },
                                            description: {
                                                type: Type.STRING,
                                            },
                                            url: {
                                                type: Type.STRING,
                                            },
                                            type: {
                                                type: Type.STRING,
                                            },
                                        },
                                        required: [
                                            "title",
                                            "description",
                                            "url",
                                            "type",
                                        ],
                                    },
                                },
                            },
                            assessment: {
                                type: Type.OBJECT,
                                properties: {
                                    title: {
                                        type: Type.STRING,
                                    },

                                    questions: {
                                        type: Type.ARRAY,

                                        items: {
                                            type: Type.OBJECT,

                                            properties: {
                                                question: {
                                                    type: Type.STRING,
                                                },

                                                options: {
                                                    type: Type.ARRAY,

                                                    items: {
                                                        type: Type.STRING,
                                                    },
                                                },

                                                correctAnswer: {
                                                    type: Type.INTEGER,
                                                },

                                                explanation: {
                                                    type: Type.STRING,
                                                },
                                            },

                                            required: [
                                                "question",
                                                "options",
                                                "correctAnswer",
                                                "explanation",
                                            ],
                                        },
                                    },
                                },

                                required: [
                                    "title",
                                    "questions",
                                ],
                            },
                            required: [
                                "title",
                                "description",
                                "type",
                                "skills",
                                "prerequisites",
                                "estimatedHours",
                                "reason",
                                "learningMaterial",
                                "practiceTask",
                                "resources",
                                "assessment",
                            ],
                        },
                    },
                    
                },
                required: [
                    "summary",
                    "skillGaps",
                    "roadmap",
                ],
            },
            },
        });
        console.log("AI response received.");
        return JSON.parse(response.text);
        } catch (error) {
        lastError = error;
        console.error(`AI attempt ${attempt} failed:`, error.message);
        if (attempt < 3) {
            const delay = attempt * 2000;
            console.log(`Retrying in ${delay / 1000} seconds...`);
            await sleep(delay);
        }
        }
    }
    throw lastError;
};

const chatWithAI = async ({ user, learningPath, progress, message }) => {
    const completedModules = progress.filter((item) => item.completed).map((item) => item.moduleId);
    const modules = learningPath?.modules || [];
    const prompt = `
        You are an expert AI learning assistant.

        You are helping a learner follow a personalized learning roadmap.

        LEARNER PROFILE:
        Name: ${user.name}
        Goal: ${user.goal}
        Experience Level: ${user.experienceLevel}
        Skills: ${user.skills.join(", ") || "None"}
        Interests: ${user.interests.join(", ") || "None"}
        Learning Preference: ${user.learningPreference}
        Available Weekly Hours: ${user.weeklyHours}

        LEARNING PATH:
        Title: ${learningPath?.title || "Not generated"}
        Description: ${learningPath?.description || "None"}

        MODULES:
        ${modules
            .map(
                (module, index) =>
                    `${index + 1}. ${module.title}
        Description: ${module.description}
        Skills: ${module.skills.join(", ")}
        Prerequisites: ${module.prerequisites.join(", ") || "None"}
        Estimated Hours: ${module.estimatedHours}
        Why recommended: ${module.reason}`
            )
            .join("\n\n")}

        COMPLETED MODULE IDS:
        ${completedModules.join(", ") || "None"}

        LEARNER QUESTION:
        ${message}

        INSTRUCTIONS:

        1. Answer the learner's question clearly and practically.
        2. Use their profile and learning path to personalize the answer.
        3. If they ask what to learn next, recommend the next appropriate module.
        4. If they ask why something was recommended, explain using their skill gaps.
        5. If they ask about a technical topic, teach it at their current experience level.
        6. Do not recommend skills they already clearly know unless they are prerequisites.
        7. Keep answers concise but useful.
        8. Encourage project-based learning where appropriate.
        9. Consider the learner's completed courses when recommending what to study next.
        10. Avoid recommending material they have already completed unless review is necessary.

        Keep responses concise and conversational.

        Rules:
        - Maximum 80-120 words per response.
        - Prefer 2-4 short paragraphs.
        - Use bullet points when listing things.
        - Do not repeat the user's profile or learning path unnecessarily.
        - Answer the user's actual question first.
        - Do not provide unsolicited long explanations.
        - If the user asks a simple question, give a simple answer.
        - End with one short helpful follow-up question when appropriate.

        IF it is a casual talk - You also be casual (within 10-20 words)
    `;
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    });
    return response.text;
};

const reassessLearningPath = async ({
    user,
    learningPath,
    progress,
    feedback,
    }) => {
    const prompt = `
        You are an adaptive AI learning coach.

        Analyze the learner's current situation and determine whether their personalized learning path should be adjusted.

        LEARNER:
        Name: ${user.name}
        Goal: ${user.goal}
        Experience Level: ${user.experienceLevel}
        Skills: ${user.skills?.join(", ") || "None"}
        Interests: ${user.interests?.join(", ") || "None"}
        Learning Preference: ${user.learningPreference}
        Weekly Hours: ${user.weeklyHours}

        CURRENT LEARNING PATH:
        ${JSON.stringify(learningPath?.modules || [], null, 2)}

        CURRENT PROGRESS:
        ${JSON.stringify(progress || [], null, 2)}

        LEARNER FEEDBACK:
        ${JSON.stringify(feedback || [], null, 2)}

        TASK:
        Analyze the learner's progress and feedback.

        Determine:
        1. What they should continue learning.
        2. What they should review.
        3. Whether any module should be moved, skipped, repeated, or adjusted.
        4. What their next recommended action should be.
        5. Why the recommendation was made.

        IMPORTANT:
        - Only recommend changes when they are actually justified.
        - Respect the learner's goal and available weekly hours.
        - Use the existing learning path as the primary context.
        - Do not invent completed work.
        - Keep the response concise.
        - Maximum 150 words.
        - Use short sections and bullet points.

        Return a practical recommendation for the learner.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    });
    return response.text;
};

module.exports = {
    analyzeLearner,
    chatWithAI,
    reassessLearningPath,
};