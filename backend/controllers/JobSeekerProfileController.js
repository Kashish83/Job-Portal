const mongoose = require("mongoose");
const JobseekerProfile = require("../models/JobseekerProfile");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ---------- Profile Completion Helper ----------
const calculateCompletion = (profile) => {
  const fields = [
    profile.phone,
    profile.location,
    profile.bio,
    profile.skills?.length > 0,
    profile.education?.length > 0,
    profile.experience?.length > 0,
    profile.portfolio,
    profile.profilePhoto,
    profile.resumes?.length > 0,
    profile.certifications?.length > 0,
  ];

  const filled = fields.filter(f => f).length;
  return Math.round((filled / fields.length) * 100);
};

// ---------- GET Profile ----------
exports.getProfile = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- UPDATE Profile ----------
exports.updateProfile = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const {
      phone,
      location,
      bio,
      skills,
      education,
      experience,
      portfolio
    } = req.body;

    let profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) {
      // Create if not exists
      profile = new JobseekerProfile({ user: req.user._id });
    }

    if (phone) profile.phone = phone;
    if (location) profile.location = location;
    if (bio) profile.bio = bio;
    if (skills) profile.skills = Array.isArray(skills) ? skills : skills.split(",");
    if (education) profile.education = Array.isArray(education) ? education : education.split(",");
    if (experience) profile.experience = Array.isArray(experience) ? experience : experience.split(",");
    if (portfolio) profile.portfolio = portfolio;

    // Profile photo upload
    if (req.file) {
      // Delete old photo if exists
      if (profile.profilePhoto && fs.existsSync(profile.profilePhoto)) {
        fs.unlinkSync(profile.profilePhoto);
      }
      profile.profilePhoto = req.file.path;
    }

    // Update completion %
    profile.completion = calculateCompletion(profile);

    await profile.save();

    res.json({ message: "Profile updated", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Resume Upload ----------
exports.addResume = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.resumes.push(req.file.path);
    profile.completion = calculateCompletion(profile);
    await profile.save();

    res.json({ message: "Resume uploaded", resumes: profile.resumes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Resume Delete ----------
exports.deleteResume = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const { resumeId } = req.params;

    const profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const resumeIndex = profile.resumes.findIndex(r => r === resumeId);
    if (resumeIndex === -1) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Delete file from server
    if (fs.existsSync(profile.resumes[resumeIndex])) {
      fs.unlinkSync(profile.resumes[resumeIndex]);
    }

    profile.resumes.splice(resumeIndex, 1);
    profile.completion = calculateCompletion(profile);

    await profile.save();

    res.json({ message: "Resume deleted", resumes: profile.resumes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Certifications (Already existing functions) ----------
exports.addCertification = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") return res.status(403).json({ message: "Only jobseekers allowed" });

    const { title, organization, year } = req.body;
    if (!title || !organization) return res.status(400).json({ message: "Required fields missing" });

    const profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.certifications.push({ title, organization, year });
    profile.completion = calculateCompletion(profile);
    await profile.save();

    res.json({ message: "Certification added", certifications: profile.certifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") return res.status(403).json({ message: "Only jobseekers allowed" });

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid Certification ID" });

    const profile = await JobseekerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.certifications = profile.certifications.filter(cert => cert._id.toString() !== id);
    profile.completion = calculateCompletion(profile);
    await profile.save();

    res.json({ message: "Certification removed", certifications: profile.certifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
