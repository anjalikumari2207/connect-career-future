const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    // 👇 NEW fields for Profile
    bio: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    skills: [{ type: String }],
    wallet: { type: String, default: "" },

    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
