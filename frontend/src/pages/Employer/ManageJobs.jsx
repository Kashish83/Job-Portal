import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 🔹 Fetch employer jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/my");
        setJobs(res.data);
        setErrorMsg("");
      } catch (err) {
        setErrorMsg("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Delete job
  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setUpdatingId(jobId);
    try {
     await API.delete(`/jobs/${jobId}`);
     setJobs(jobs.filter((job) => job._id !== jobId));
      setSuccessMsg("Job deleted successfully!");
    } catch (err) {
      setErrorMsg("Job delete failed");
    } finally {
      setUpdatingId(null);
    }
  };

  // 🔹 Close job
  const closeJob = async (jobId) => {
    setUpdatingId(jobId);
    try {
      await API.put(`/jobs/${jobId}`, { status: "closed" });
      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, status: "closed" } : job
        )
      );
      
      setSuccessMsg("Job closed successfully!");
    } catch (err) {
      setErrorMsg("Failed to close job");
    } finally {
      setUpdatingId(null);
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

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {jobs.length === 0 ? (
        <div className="alert alert-info">
          You have not posted any jobs yet.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table modern-table mb-0">
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
              {jobs.map((job) => {
                const status = job.status || "open";

                return (
                  <tr key={job._id}>
                    <td>{job.title || "N/A"}</td>
                    <td>{job.location || "N/A"}</td>
                    <td>{job.salary || "N/A"}</td>

                    <td>
                      <span
                        className={`badge ${
                          status === "open" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/employer/job-applicants/${job._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        {job.applicantsCount || 0} Applicants
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
                        disabled={updatingId === job._id}
                      >
                        Delete
                      </button>

                      {status === "open" && (
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => closeJob(job._id)}
                          disabled={updatingId === job._id}
                        >
                          Close
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;