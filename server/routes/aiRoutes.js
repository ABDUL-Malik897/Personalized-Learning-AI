const express = require("express");
const router = express.Router();
const { generateLearningPath, chat, reassess, } = require("../controllers/aiController");

router.post("/generate", generateLearningPath);
router.post("/chat", chat);
router.post("/reassess", reassess);

module.exports = router;