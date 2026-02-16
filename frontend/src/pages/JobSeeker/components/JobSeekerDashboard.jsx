// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/api";

// const JobseekerDashboard = () => {
//   const [stats, setStats] = useState({});
//   const [recentJobs, setRecentJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await API.get("/dashboard/jobseeker");
//         setStats(res.data.stats);
//         setRecentJobs(res.data.recentApplications);
//       } catch (err) {
//         console.error("Dashboard load failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-5">Loading dashboard...</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Jobseeker Dashboard</h2>

//       {/* Stats Cards */}
//       <div className="row mb-4">
//         <div className="col-md-3">
//           <div className="card text-center shadow-sm">
//             <div className="card-body">
//               <h5>{stats.applied}</h5>
//               <p className="text-muted">Applied Jobs</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card text-center shadow-sm">
//             <div className="card-body">
//               <h5>{stats.shortlisted}</h5>
//               <p className="text-muted">Shortlisted</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card text-center shadow-sm">
//             <div className="card-body">
//               <h5>{stats.interviews}</h5>
//               <p className="text-muted">Interviews</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card text-center shadow-sm">
//             <div className="card-body">
//               <h5>{stats.rejected}</h5>
//               <p className="text-muted">Rejected</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Applications */}
//       <div className="card shadow-sm mb-4">
//         <div className="card-header">Recent Applications</div>
//         <ul className="list-group list-group-flush">
//           {recentJobs.map((job) => (
//             <li
//               className="list-group-item d-flex justify-content-between"
//               key={job._id}
//             >
//               <div>
//                 <strong>{job.jobTitle}</strong>
//                 <div className="text-muted">{job.company}</div>
//               </div>
//               <span className="badge bg-secondary">{job.status}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Quick Actions */}
//       <div className="d-flex gap-2">
//         <Link to="/jobs" className="btn btn-primary">
//           Browse Jobs
//         </Link>
//         <Link to="/jobseeker/applied-jobs" className="btn btn-outline-secondary">
//           Applied Jobs
//         </Link>
//         <Link to="/jobseeker/profile" className="btn btn-outline-success">
//           Update Profile
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default JobseekerDashboard;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/api";

const JobseekerDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/jobseeker");
        setStats(res.data.stats || {});
        setRecentJobs(res.data.recentApplications || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "applied":
        return "bg-primary";
      case "shortlisted":
        return "bg-success";
      case "interview":
        return "bg-warning";
      case "rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👋 Welcome back!</h2>

      {/* Stats */}
      <div className="row mb-4">
        {[
          { label: "Applied Jobs", value: stats.applied, color: "primary" },
          { label: "Shortlisted", value: stats.shortlisted, color: "success" },
          { label: "Interviews", value: stats.interviews, color: "warning" },
          { label: "Rejected", value: stats.rejected, color: "danger" },
        ].map((item, i) => (
          <div className="col-md-3" key={i}>
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h3 className={`text-${item.color}`}>
                  {item.value || 0}
                </h3>
                <p className="text-muted">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">
          Recent Applications
        </div>
        <ul className="list-group list-group-flush">
          {recentJobs.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              No applications yet
            </li>
          ) : (
            recentJobs.map((job) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={job._id}
              >
                <div>
                  <strong>{job.jobTitle}</strong>
                  <div className="text-muted small">
                    {job.company}
                  </div>
                </div>
                <span className={`badge ${getStatusBadge(job.status)}`}>
                  {job.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="d-flex flex-wrap gap-2">
        <Link to="/jobs" className="btn btn-primary">
          Browse Jobs
        </Link>
        <Link to="/jobseeker/applied-jobs" className="btn btn-outline-secondary">
          Applied Jobs
        </Link>
        <Link to="/jobseeker/profile" className="btn btn-outline-success">
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
