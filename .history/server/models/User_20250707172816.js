const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  linkedin: String,
  skills: [String],
  wallet: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
