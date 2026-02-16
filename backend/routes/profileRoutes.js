const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createOrUpdateProfile,
  getMyProfile
} = require("../controllers/profileController");

router.post("/", protect, authorize("jobseeker"), createOrUpdateProfile);
router.get("/me", protect, authorize("jobseeker"), getMyProfile);
const {
  addCertification,
  deleteCertification
} = require("../controllers/profileController");

router.post(
  "/certifications",
  protect,
  authorize("jobseeker"),
  addCertification
);

router.delete(
  "/certifications/:id",
  protect,
  authorize("jobseeker"),
  deleteCertification
);

module.exports = router;
