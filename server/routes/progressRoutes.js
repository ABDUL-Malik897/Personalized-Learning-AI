const express = require("express");
const { createProgress, updateProgress, getUserProgress, } = require("../controllers/progressController");
const router = express.Router();

router.post("/", createProgress);
router.get("/user/:userId", getUserProgress);
router.put("/:id", updateProgress);

module.exports = router;