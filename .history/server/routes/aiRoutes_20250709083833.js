// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const natural = require("natural");
const cosineSimilarity = require("cosine-similarity");
const Job = require("../models/Job"); // MongoDB job model

// 🔍 Skill Extraction from resume text
router.post("/extract-skills", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ msg: "No input text provided" });

  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  const skillKeywords = [
    "react", "typescript", "node.js", "python", "machine learning", "deep learning",
    "tensorflow", "pytorch", "data analysis", "aws", "docker", "sql", "graphql",
    "mongodb", "communication", "teamwork", "leadership", "ui/ux", "next.js"
  ];

  const extractedSkills = skillKeywords.filter(skill =>
    tokens.includes(skill.toLowerCase())
  );

  res.json({ skills: extractedSkills });
});

// 🤖 Job-to-resume matching
router.post("/match-jobs", async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ msg: "No resume text provided" });

  try {
    const tokenizer = new natural.WordTokenizer();
    const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());

    const jobs = await Job.find({}); // All jobs from DB
    const matches = [];

    for (const job of jobs) {
      const jobTokens = tokenizer.tokenize(job.description.toLowerCase());
      const vocab = Array.from(new Set([...resumeTokens, ...jobTokens]));

      const getVector = (tokens) =>
        vocab.map(word => tokens.filter(t => t === word).length);

      const resumeVec = getVector(resumeTokens);
      const jobVec = getVector(jobTokens);

      const score = cosineSimilarity(resumeVec, jobVec);
      const matchScore = (score * 100).toFixed(1);

      matches.push({
        jobId: job._id,
        title: job.title,
        company: job.company,
        matchScore,
        location: job.location,
      });
    }

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ matches });
  } catch (err) {
    console.error("Job match error:", err);
    res.status(500).json({ msg: "Error matching jobs" });
  }
});

module.exports = router;
