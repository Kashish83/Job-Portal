const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  addCertification,
  deleteCertification
} = require("../controllers/JobSeekerProfileController");

// Get Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, upload.single("profilePhoto"), updateProfile);

// Certifications
router.post("/certification", protect, addCertification);
router.delete("/certification/:id", protect, deleteCertification);

// 🔥 VERY IMPORTANT
module.exports = router;
