import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch employer jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/employer/jobs");
        setJobs(res.data);
      } catch (err) {
        alert("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Delete job
  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/employer/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      alert("Job delete failed");
    }
  };

  // 🔹 Close job
  const closeJob = async (jobId) => {
    try {
      await API.put(`/employer/jobs/${jobId}/close`);
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: "closed" } : job
        )
      );
    } catch (err) {
      alert("Failed to close job");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Jobs</h3>
        <Link to="/employer/post-job" className="btn btn-primary">
          + Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="alert alert-info">
          You have not posted any jobs yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>

                  <td>
                    <span
                      className={`badge ${
                        job.status === "open"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/employer/job-applicants/${job._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      {job.applicantsCount} Applicants
                    </Link>
                  </td>

                  <td>
                    <Link
                      to={`/employer/edit-job/${job._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>

                    {job.status === "open" && (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => closeJob(job._id)}
                      >
                        Close
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
