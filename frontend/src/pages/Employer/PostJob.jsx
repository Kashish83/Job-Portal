import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    skills: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    lastDate: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug: Check token and data
    console.log("Token:", localStorage.getItem("token"));
    console.log("Job data:", job);
    
    try {
      // Convert skills string to array
      const jobData = {
        ...job,
        skills: job.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "")
      };
      
      // FIXED: Changed from "/jobs" to "/jobs/create"
      await API.post("/jobs/create", jobData);
      
      alert("Job Posted Successfully 🎉");
      console.log("Job Posted Successfully:", jobData);
      navigate("/employer/manage-jobs");
      
    } catch (err) {
      console.error("Full error details:", err);
      console.error("Error response:", err.response?.data);
      
      // Show specific error message
      if (err.response?.status === 401) {
        alert("You need to login as an employer first!");
      } else if (err.response?.status === 403) {
        alert("Only employers can post jobs!");
      } else if (err.response?.status === 404) {
        alert("API endpoint not found. Check backend routes.");
      } else {
        alert(`Error posting job: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Backend Developer"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Description *</label>
          <textarea
            name="description"
            placeholder="Describe the job responsibilities, requirements, etc."
            value={job.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Required Skills *</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g., Node.js, MongoDB, React (comma separated)"
            value={job.skills}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Experience Required *</label>
            <input
              type="text"
              name="experience"
              placeholder="e.g., 0-2 years, 3-5 years"
              value={job.experience}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              placeholder="e.g., 50000"
              value={job.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Noida, Remote"
              value={job.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Type *</label>
            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Application Deadline *</label>
          <input
            type="date"
            name="lastDate"
            value={job.lastDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Post Job
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium">Note:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>You must be logged in as an employer to post jobs</li>
          <li>All fields marked with * are required</li>
          <li>Job will be visible to job seekers after approval</li>
        </ul>
      </div>
    </div>
  );
};

export default PostJob;