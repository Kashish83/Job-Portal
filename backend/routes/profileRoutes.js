// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const { authorize } = require("../middleware/roleMiddleware");

// // 1️⃣ Import all controller functions
// const {
//   createOrUpdateProfile,
//   getMyProfile,
//   addCertification,
//   deleteCertification
// } = require("../controllers/profileController");

// // 2️⃣ Profile routes
// router.post("/", protect, authorize("jobseeker"), createOrUpdateProfile);
// router.get("/me", protect, authorize("jobseeker"), getMyProfile);

// // 3️⃣ Certification routes
// router.post("/certifications", protect, authorize("jobseeker"), addCertification);
// router.delete("/certifications/:id", protect, authorize("jobseeker"), deleteCertification);

// module.exports = router;
