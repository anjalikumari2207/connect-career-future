const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');
const Application = require("../models/Application");

router.post("/:jobId/apply", authMiddleware, async (req, res) => {
  const { jobId } = req.params;
  try {
    const alreadyApplied = await Application.findOne({
      jobId,
      userId: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ msg: "Already applied to this job" });
    }

    const application = new Application({
      jobId,
      userId: req.user.id,
    });

    await application.save();

    res.status(201).json({ msg: "Application submitted!" });
  } catch (err) {
    console.error("❌ Apply job error:", err);
    res.status(500).json({ msg: "Server error while applying to job." });
  }
});


// ✅ POST /api/jobs - Create a new job (requires auth)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      description,
      requirements,
      skills,
    } = req.body;

    // 🔍 Validate required fields
    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !type ||
      !description ||
      !requirements
    ) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    // 💾 Create and save job
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
    console.error('❌ Job post error:', err);
    res.status(500).json({ msg: 'Server error while posting job.' });
  }
});

// ✅ GET /api/jobs - Fetch all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email'); // Optional: show who posted
    res.json(jobs);
  } catch (err) {
    console.error('❌ Fetch jobs error:', err);
    res.status(500).json({ msg: 'Server error while fetching jobs.' });
  }
});

module.exports = router;
