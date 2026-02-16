const express= require("express");
const router= express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createJob, getAllJobs ,getMyJobs, getJobById,updateJob, deleteJob} = require("../controllers/jobController");
const role = require("../middleware/roleMiddleware");

// Employer-only
router.post("/create", protect, authorize("employer"), createJob);
router.get("/my",protect,authorize("employer"),getMyJobs);
router.delete("/:jobId",protect,authorize("employer"),deleteJob);
// Jobseeker-only
router.get("/all", protect, getAllJobs); 
router.get("/:jobId",protect,getJobById);
router.put("/:jobId", protect, authorize("employer"), updateJob);
module.exports = router;