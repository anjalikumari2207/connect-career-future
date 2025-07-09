const Job = require("../models/Job"); // ✅ Assuming you have this model
const natural = require("natural");
const cosineSimilarity = require("cosine-similarity");

const tokenizer = new natural.WordTokenizer();

router.post("/match-jobs", async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({ msg: "Resume text is required" });
    }

    // Step 1: Tokenize resume
    const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());

    // Step 2: Fetch all job descriptions
    const jobs = await Job.find().select("title company description");

    // Step 3: Match each job with resume using cosine similarity
    const matches = jobs.map(job => {
      const jobTokens = tokenizer.tokenize(job.description.toLowerCase());

      const vocab = Array.from(new Set([...resumeTokens, ...jobTokens]));

      const toVector = (tokens) =>
        vocab.map(word => tokens.filter(t => t === word).length);

      const resumeVector = toVector(resumeTokens);
      const jobVector = toVector(jobTokens);

      const score = cosineSimilarity(resumeVector, jobVector);
      const matchScore = Math.round(score * 100);

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        matchScore
      };
    });

    // Step 4: Sort by best match
    const sorted = matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({ matches: sorted });
  } catch (err) {
    console.error("❌ Match error:", err);
    res.status(500).json({ msg: "Failed to match jobs" });
  }
});
