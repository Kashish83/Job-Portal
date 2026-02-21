


import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import { Link } from "react-router-dom";


const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await API.get("/jobseeker/saved/jobs");
        setJobs(res.data || []);
      } catch (err) {
        console.log(err);
        alert("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const removeJob = async (jobId) => {
    if (!window.confirm("Remove this job?")) return;
    try {
      await API.delete(`/jobseeker/${jobId}/unsave`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      alert("Failed to remove job");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading Saved Jobs...</h3>;

  return (
    <div className="savedJobs container py-4">
      <h2 className="fw-bold mb-4">Saved Jobs ❤️</h2>

      {jobs.length === 0 ? (
        <div className="empty-box">
          <h5>No saved jobs yet</h5>
          <p>Save jobs to view them later</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job,index) => (
            <div className="job-card" key={job._id || index}>
              
              <div className="job-top">
                <h5>{job.title}</h5>
                <span className="company">{job.company?.name}</span>
              </div>

              <p className="location">📍 {job.location}</p>

              <div className="job-actions">
                <Link
                  to={`/jobseeker/job/${job._id}`}
                  className="btn btn-dark btn-sm"
                >
                  View Job
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeJob(job._id)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
