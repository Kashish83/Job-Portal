const Application = require("../models/Application");
const Job = require("../models/Job");
const mongoose = require("mongoose");

// ✅ Employer: View all applications for a job
const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate Job ID
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    // Check role
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can view applications" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ appliedAt: -1 });

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Employer: Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid Application ID" });
    }

    const allowedStatuses =["Pending", "Shortlisted", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can update status" });
    }

    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Status updated successfully", application });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getApplicationsByJob, updateApplicationStatus };
