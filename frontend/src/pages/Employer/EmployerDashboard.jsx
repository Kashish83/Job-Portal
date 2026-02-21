import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import "../../styles/employer.css"
const EmployerDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    openJobs: 0,
    totalApplicants: 0,
    shortlistedApplicants: 0
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/dashboard/employer");
      console.log("Dashboard response:", res); // <-- debug backend response

      const data = res.data || {};

      setStats({
        totalJobs: data.stats?.totalJobs ?? 0,
        openJobs: data.stats?.openJobs ?? 0,
        totalApplicants: data.stats?.totalApplicants ?? 0,
        shortlistedApplicants: data.stats?.shortlistedApplicants ?? 0,
      });

      setRecentJobs(Array.isArray(data.recentJobs) ? data.recentJobs : []);
      setRecentApplicants(Array.isArray(data.recentApplicants) ? data.recentApplicants : []);

      setError(null);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError("Failed to load dashboard data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);


  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard container py-4">

      <h2 className="fw-bold mb-4">Employer Dashboard</h2>

      {/* ================= STATS ================= */}
      <div className="stats-grid mb-5">

        <div className="stat-card">
          <div>
            <h6>Total Jobs</h6>
            <h2>{stats.totalJobs}</h2>
          </div>
          <span>💼</span>
        </div>

        <div className="stat-card">
          <div>
            <h6>Open Jobs</h6>
            <h2>{stats.openJobs}</h2>
          </div>
          <span>📢</span>
        </div>

        <div className="stat-card">
          <div>
            <h6>Applicants</h6>
            <h2>{stats.totalApplicants}</h2>
          </div>
          <span>👨‍💻</span>
        </div>

        <div className="stat-card">
          <div>
            <h6>Shortlisted</h6>
            <h2>{stats.shortlistedApplicants}</h2>
          </div>
          <span>⭐</span>
        </div>

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="mb-5">
        <Link to="/employer/post-job" className="btn btn-dark me-3">
          + Post Job
        </Link>
        <Link to="/employer/manage-jobs" className="btn btn-outline-dark">
          Manage Jobs
        </Link>
      </div>

      {/* ================= RECENT JOBS ================= */}
      <div className="dashboard-card mb-5">
        <h4 className="mb-3">Recent Jobs</h4>

        {recentJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <table className="table modern-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Applicants</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>
                    <span className={job.status === "open" ? "status-open" : "status-close"}>
                      {job.status}
                    </span>
                  </td>
                  <td>{job.applicantsCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= RECENT APPLICANTS ================= */}
      <div className="dashboard-card">
        <h4 className="mb-3">Recent Applicants</h4>

        {recentApplicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <table className="table modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplicants.map(app => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.jobTitle}</td>
                  <td>
                    <span className={`status-${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default EmployerDashboard;