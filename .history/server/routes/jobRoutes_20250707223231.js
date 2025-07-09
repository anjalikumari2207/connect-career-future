const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, postedBy: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("❌ Job post error:", err);
    res.status(500).json({ msg: "Server error while posting job." });
  }
});

module.exports = router;
