// server/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// @route    GET /api/users/me
// @desc     Get current logged-in user
// @access   Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ msg: "Server error while fetching user" });
  }
});

module.exports = router;
