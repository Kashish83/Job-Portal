const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// =====================
// Load Environment Variables
// =====================
dotenv.config();

// =====================
// Connect to MongoDB
// =====================
connectDB();

// =====================
// Create Express App
// =====================
const app = express();

// =====================
// Global Middlewares
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Base Route
// =====================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// =====================
// API Routes
// =====================

// Auth Routes (Signup / Login)
app.use("/api/auth", require("./routes/auth"));

// Test Protected Route
app.use("/api/test", require("./routes/test"));

// Job Routes
app.use("/api/jobs", require("./routes/jobRoutes"));

// Apply Job Routes
app.use("/api/apply", require("./routes/apply"));

// Jobseeker Profile Routes
app.use("/api/profile", require("./routes/jobSeekerProfileRoutes"));

// Employer Routes
app.use("/api/employer", require("./routes/employerRoutes"));
// Jobseeker Saved Jobs Routes
app.use("/api/jobseeker", require("./routes/savedJobRoutes"));
// Dashboard Routes
app.use("/api/dashboard", require("./routes/dashboardRoute"));

// Resume Routes (If You Are Using Separate Controller)
// app.use("/api/resume", require("./routes/resumeRoutes"));

// =====================
// Serve Uploaded Files
// =====================
app.use("/uploads", express.static("uploads"));

// =====================
// 404 Handler
// =====================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// =====================
// Global Error Handler (Optional but Recommended)
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
