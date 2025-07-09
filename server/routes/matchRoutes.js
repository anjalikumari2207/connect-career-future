// routes/matchRoutes.js
const express = require("express");
const router = express.Router();
const { calculateMatchScore } = require("../controllers/matchController");

router.post("/match-score", calculateMatchScore);

module.exports = router;
