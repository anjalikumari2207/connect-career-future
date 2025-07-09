const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  type: String,
  description: String,
  requirements: String,
  skills: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
