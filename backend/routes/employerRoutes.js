const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
  getApplicationsByJob,
  updateApplicationStatus
} = require("../controllers/applicationsController");

// ✅ Employer can view applications per job
router.get("/applications/:jobId", protect, authorize("employer"), getApplicationsByJob);

// ✅ Employer can update application status
router.put("/applications/:applicationId/status", protect, authorize("employer"), updateApplicationStatus);


module.exports = router;
