const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes'); // ✅ Only once

dotenv.config();
const app = express();

// ✅ CORS config to allow Authorization header
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ JSON parser
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB Error", err));

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes); // ✅ Use job routes once
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);
// server/server.js or wherever your main file is
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);



// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
