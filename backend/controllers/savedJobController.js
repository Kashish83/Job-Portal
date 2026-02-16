const User = require("../models/User");
const Job = require("../models/Job");

const mongoose = require("mongoose");

const saveJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { savedJobs: jobId } } // prevents duplicate
    );

    res.json({ message: "Job saved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const user = await User.findById(req.user._id)
      .populate("savedJobs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedJobs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers allowed" });
    }

    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { savedJobs: jobId } }
    );

    res.json({ message: "Job removed from saved list" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};
