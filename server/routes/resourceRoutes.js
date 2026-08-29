const express = require("express");
const { getResourceContent, } = require("../controllers/resourceController");
const router = express.Router();

router.get("/content", getResourceContent);

module.exports = router;