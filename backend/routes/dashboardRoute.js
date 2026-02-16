// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// const {
//   employerDashboard,
//   jobseekerDashboard
// } = require("../controllers/dashboardController");

// router.get("/jobseeker", protect, role("jobseeker"), jobseekerDashboard);
// router.get("/employer", protect, role("employer"), employerDashboard);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  employerDashboard,
  jobseekerDashboard
} = require("../controllers/dashboardController");

router.get("/jobseeker", protect, authorize("jobseeker"), jobseekerDashboard);
router.get("/employer", protect, authorize("employer"), employerDashboard);

module.exports = router;
