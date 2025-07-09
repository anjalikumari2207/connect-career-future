const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

// GET /api/profile - Get logged-in user's profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Fetch profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/profile - Update logged-in user's profile
router.put("/", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
