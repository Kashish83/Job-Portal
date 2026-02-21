const express = require("express");
const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ✅ Jobseeker only

// Save a job
router.post(
  "/:jobId/save",
  protect,
  authorize("jobseeker"),
  saveJob
);

// Get saved jobs
router.get(
  "/saved/jobs",
  protect,
  authorize("jobseeker"),
  getSavedJobs
);

// Remove a saved job
router.delete(
  "/:jobId/unsave",
  protect,
  authorize("jobseeker"),
  removeSavedJob
);

module.exports = router;