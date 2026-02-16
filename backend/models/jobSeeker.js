const mongoose = require("mongoose");

const jobseekerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone: String,
  location: String,
  bio: String,
  skills: [String],
  education: [String],
  experience: [String],
  portfolio: String,
  profilePhoto: String,

  resumes: [
    {
      title: String,
      fileUrl: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  certifications: [
    {
      title: String,
      organization: String,
      year: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("JobseekerProfile", jobseekerProfileSchema);
