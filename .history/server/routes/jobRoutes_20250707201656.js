const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/authMiddleware");

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("createdBy", "name skills");
  res.json(jobs);
});

// Create a job (auth required)
router.post("/", auth, async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user.id });
  res.json(job);
});

module.exports = router;
