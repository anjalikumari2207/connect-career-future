const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

module.exports = mongoose.model("User", UserSchema);
