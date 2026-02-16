const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Jobseeker only
router.post(
  "/:jobId/save",
  protect,
  authorize("jobseeker"),
  saveJob
);

router.get(
  "/saved/jobs",
  protect,
  authorize("jobseeker"),
  getSavedJobs
);

router.delete(
  "/:jobId/unsave",
  protect,
  authorize("jobseeker"),
  removeSavedJob
);
