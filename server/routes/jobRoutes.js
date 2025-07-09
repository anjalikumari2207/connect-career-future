const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');
const Application = require("../models/Application");
const User = require('../models/User');
const { Connection, PublicKey } = require("@solana/web3.js");

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
      txHash,
    } = req.body;

    if (
      !title || !company || !location || !salary ||
      !type || !description || !requirements || !txHash
    ) {
      return res.status(400).json({ msg: 'All fields including txHash are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user?.wallet) {
      return res.status(400).json({ msg: "User wallet address is missing." });
    }

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const tx = await connection.getParsedTransaction(txHash, { maxSupportedTransactionVersion: 0 });

    if (!tx) {
      return res.status(400).json({ msg: "Invalid or unconfirmed transaction hash." });
    }

    const adminWallet = "12c9CS6jPkKTGhAb1Wi7DQsnpJn9PX2uu54n1EgwzPvV";

    const matched = tx.transaction.message.instructions.some(instr => {
      const parsed = instr.parsed;
      return (
        parsed?.type === "transfer" &&
        parsed?.info?.destination === adminWallet &&
        parsed?.info?.source === user.wallet // ✅ match sender
      );
    });

    if (!matched) {
      return res.status(400).json({
        msg: "Transaction must transfer SOL from your wallet to the admin wallet.",
      });
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
      txHash,
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
