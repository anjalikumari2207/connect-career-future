const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const natural = require("natural");
const cosineSimilarity = require("cosine-similarity");
const Job = require("../models/Job");

const upload = multer({ storage: multer.memoryStorage() });

// 🔍 Skill Extraction from Text
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

// 🤖 Job-to-Resume Matching (Cosine Similarity)
router.post("/match-jobs", async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ msg: "No resume text provided" });

  try {
    const tokenizer = new natural.WordTokenizer();
    const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());

    const jobs = await Job.find({});
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

    matches.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ matches });
  } catch (err) {
    console.error("Job match error:", err);
    res.status(500).json({ msg: "Error matching jobs" });
  }
});

// 📄 Resume Upload (PDF/DOCX) → Skill Extraction
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  try {
    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      text = data.text;
    } else if (
      req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else {
      return res.status(400).json({ msg: "Unsupported file type" });
    }

    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase());

    const skillKeywords = [
      "react", "typescript", "node.js", "python", "machine learning", "deep learning",
      "tensorflow", "pytorch", "data analysis", "aws", "docker", "sql", "graphql",
      "mongodb", "communication", "teamwork", "leadership", "ui/ux", "next.js"
    ];

    const matched = skillKeywords.filter(skill =>
      tokens.includes(skill.toLowerCase())
    );

    res.json({ skills: [...new Set(matched)] });
  } catch (err) {
    console.error("Resume upload error:", err);
    res.status(500).json({ msg: "Failed to process resume file" });
  }
});

module.exports = router;
