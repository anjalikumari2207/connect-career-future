const express = require("express");
const router = express.Router();

// ✅ Extract skills from resume or bio
router.post("/extract-skills", async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ msg: "No input text provided" });

  const keywords = [
    "React", "Node.js", "Python", "AWS", "Docker", "SQL", "MongoDB",
    "Leadership", "Machine Learning", "TypeScript"
  ];

  const foundSkills = keywords.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  res.json({ skills: foundSkills });
});

// Optional: Job matching logic
router.post("/match-jobs", async (req, res) => {
  res.json({ msg: "Coming soon!" });
});

module.exports = router;
