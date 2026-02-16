const Job = require("../models/Job");
const Application = require("../models/Application");
const mongoose = require("mongoose");

// ✅ Apply Job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    // Role check
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can apply" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent self apply
    if (job.postedBy.toString() === userId.toString()) {
      return res.status(400).json({ message: "You cannot apply to your own job" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    let resumePath = "";
    if (req.file) resumePath = req.file.path;

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumePath,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ My Applications
exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can view applications" });
    }

    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
