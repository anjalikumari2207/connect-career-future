const express = require("express");
const router = express.Router();
const natural = require("natural");

const sampleSkills = [
  "React", "JavaScript", "TypeScript", "Node.js", "Python", "AWS",
  "Docker", "MongoDB", "Express", "TensorFlow", "GraphQL",
  "Communication", "Leadership", "Figma", "CSS", "HTML"
];

router.post("/extract-skills", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ msg: "No input text provided." });
  }

  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  const matched = sampleSkills.filter(skill =>
    tokens.includes(skill.toLowerCase())
  );

  res.json({ skills: [...new Set(matched)] });
});

module.exports = router;
