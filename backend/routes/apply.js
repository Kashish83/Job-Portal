const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
} = require("../controllers/applyController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
// ✅ Jobseeker applies for job
router.post("/:jobId", protect, authorize("jobseeker"), upload.single("resume"), applyJob);

// ✅ Jobseeker dashboard → My Applications
router.get(
  "/my",
  protect,
  authorize("jobseeker"),
  getMyApplications
);

module.exports = router;
