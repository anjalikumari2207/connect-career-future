// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

// Predefined known skills (You can later enhance this with a DB or model)
const knownSkills = [
  "react", "typescript", "node.js", "javascript", "python",
  "machine learning", "data science", "deep learning",
  "tensorflow", "pytorch", "docker", "graphql", "mongodb",
  "sql", "aws", "azure", "gcp", "leadership", "management"
];

// POST /api/ai/extract-skills
router.post("/extract-skills", (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ msg: "Invalid text input" });
    }

    // Tokenize the resume/job text
    const tokens = tokenizer.tokenize(text.toLowerCase());

    // Match known skills from tokens
    const extracted = knownSkills.filter(skill =>
      tokens.includes(skill.toLowerCase()) || skill.split(" ").every(word => tokens.includes(word))
    );

    return res.json({ skills: extracted });
  } catch (err) {
    console.error("Skill extraction error:", err);
    res.status(500).json({ msg: "Error extracting skills" });
  }
});

module.exports = router;
