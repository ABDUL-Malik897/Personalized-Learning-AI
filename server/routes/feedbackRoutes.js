const express = require("express");
const { createFeedback, getUserFeedback, } = require("../controllers/feedbackController");
const router = express.Router();

router.post("/", createFeedback);
router.get("/user/:userId", getUserFeedback);

module.exports = router;