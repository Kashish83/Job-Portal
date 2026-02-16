const Job= require("../models/Job");

const mongoose = require("mongoose");

const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can create jobs" });
    }

    const { title, description, skillsRequired, location, salary } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      title,
      description,
      skillsRequired,
      location,
      salary,
      status: "open",
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const jobs = await Job.find({
      postedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteJob = async(req,res)=>{
  try{
   const job= await Job.findById(req.params.jobId);
   if(!job){
    return res.status(404).json({message:"Job Not found"});
   }

   if(job.postedBy.toString()!==req.user._id.toString()){
    return res.status(403).json({message:"Not authorized"});
   }
   await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  }catch(error){
  res.status(500).json({message:error.message});
  }
}

const updateJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const allowedFields = [
      "title",
      "description",
      "skillsRequired",
      "location",
      "salary",
      "status"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();
    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  updateJob,
  getJobById
};



