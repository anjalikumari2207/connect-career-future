const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');
const Application = require("../models/Application");
const User = require('../models/User');

// ✅ Save or Unsave Job
router.post('/:id/save', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  try {
    const user = await User.findById(userId);
    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
      await user.save();
      return res.json({ saved: false, msg: "Job unsaved" });
    } else {
      user.savedJobs.push(jobId);
      await user.save();
      return res.json({ saved: true, msg: "Job saved" });
    }
  } catch (err) {
    console.error("Save job error", err);
    res.status(500).json({ msg: "Failed to save job" });
  }
});

// ✅ Apply to Job
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

// ✅ Post a Job (with txHash logging)
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
      txHash, // ✅ Add txHash to request body
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
      txHash, // ✅ Save blockchain transaction hash
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error('❌ Job post error:', err);
    res.status(500).json({ msg: 'Server error while posting job.' });
  }
});

// ✅ Get All Jobs (public)
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
