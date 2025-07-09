const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

// POST /api/jobs - Create job
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, company, location, salary, type, description, requirements, skills } = req.body;

    if (!title || !company || !location || !salary || !type || !description || !requirements) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      type,
      description,
      requirements,
      skills,
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("❌ Job post error:", err);
    res.status(500).json({ msg: "Server error while posting job." });
  }
});

// GET /api/jobs - Fetch jobs (no auth needed)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Fetch jobs error:", err);
    res.status(500).json({ msg: "Server error while fetching jobs." });
  }
});

module.exports = router;
