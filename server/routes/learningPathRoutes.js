const express = require("express");
const { createLearningPath, getUserLearningPaths, getLearningPath, } = require("../controllers/learningPathController");
const router = express.Router();

router.post("/", createLearningPath);
router.get("/user/:userId", getUserLearningPaths);
router.get("/:id", getLearningPath);

module.exports = router;