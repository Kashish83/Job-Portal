const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

// ✅ JOB SEEKER DASHBOARD
// ✅ JOB SEEKER DASHBOARD
exports.jobseekerDashboard = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const applications = await Application.find({
      applicant: req.user._id
    })
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    const stats = {
      applied: applications.length,
      shortlisted: applications.filter(a => a.status === "Shortlisted").length,
      interview: applications.filter(a => a.status === "Interview").length,
      accepted: applications.filter(a => a.status === "Accepted").length,
      rejected: applications.filter(a => a.status === "Rejected").length
    };

    const recentApplications = applications.slice(0, 5).map(app => ({
      _id: app._id,
      jobTitle: app.job?.title || "Unknown",
      company: app.job?.company || "Unknown",
      status: app.status
    }));

    res.json({
      success: true,
      stats,
      recentApplications,
      jobs
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ EMPLOYER DASHBOARD
exports.employerDashboard = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const jobIds = jobs.map(j => j._id);

    const applications = await Application.find({
      job: { $in: jobIds }
    }).populate("applicant", "name email");

    const stats = {
      totalJobs: jobs.length,
      openJobs: jobs.filter(j => j.status === "open").length,
      totalApplicants: applications.length,
      shortlistedApplicants: applications.filter(a => a.status === "Shortlisted").length
    };

    const recentApplicants = applications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(app => ({
        name: app.applicant?.name,
        email: app.applicant?.email,
        status: app.status
      }));

    res.json({
      stats,
      recentJobs: jobs,
      recentApplicants
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
