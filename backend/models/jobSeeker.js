const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: String,
  organization: String,
  year: String
});

const resumeSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const jobseekerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone: String,
  location: String,
  bio: String,
  skills: { type: [String], default: [] },
  education: { type: [String], default: [] },
  experience: { type: [String], default: [] },
  portfolio: String,
  profilePhoto: String,
  resumes: { type: [resumeSchema], default: [] },
  certifications: { type: [certificationSchema], default: [] },
  completion: { type: Number, default: 0 }
});

module.exports = mongoose.model("JobseekerProfile", jobseekerProfileSchema);
