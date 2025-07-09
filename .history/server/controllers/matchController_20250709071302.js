// controllers/matchController.js
const natural = require("natural");
const cosineSimilarity = require("cosine-similarity");

function getFrequencyVector(tokens, vocab) {
  return vocab.map((word) => tokens.filter((token) => token === word).length);
}

exports.calculateMatchScore = (req, res) => {
  const { jobDescription, resumeText } = req.body;
  if (!jobDescription || !resumeText) {
    return res.status(400).json({ msg: "Both job and resume text are required." });
  }

  const tokenizer = new natural.WordTokenizer();
  const jobTokens = tokenizer.tokenize(jobDescription.toLowerCase());
  const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
  const vocab = Array.from(new Set([...jobTokens, ...resumeTokens]));

  const jobVector = getFrequencyVector(jobTokens, vocab);
  const resumeVector = getFrequencyVector(resumeTokens, vocab);
  const score = cosineSimilarity(jobVector, resumeVector);
  const matchPercentage = (score * 100).toFixed(2);

  res.json({ matchScore: matchPercentage });
};
