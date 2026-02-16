// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/api";

// const ExploreJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchJobs = async () => {
//     try {
//       const res = await API.get("/jobs/all"); // ← Changed here
//       setJobs(res.data.jobs);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//       alert("Failed to load jobs");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchJobs();
// }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Explore Jobs</h3>

//       {jobs.length === 0 ? (
//         <div className="alert alert-info">
//           No jobs available right now.
//         </div>
//       ) : (
//         <div className="row">
//           {jobs.map((job) => (
//             <div className="col-md-4 mb-4" key={job._id}>
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title">{job.title}</h5>
//                   <h6 className="text-muted">{job.company}</h6>

//                   <p className="mt-2 mb-1">📍 {job.location}</p>
//                   <p className="mb-1">💰 {job.salary}</p>
//                   <p className="mb-3">🧑‍💼 {job.experience}</p>

//                   <div className="d-flex justify-content-between">
//                     <Link
//                       to={`/jobs/${job._id}`}
//                       className="btn btn-outline-primary btn-sm"
//                     >
//                       View
//                     </Link>

//                     <Link
//                       to={`/jobs/${job._id}/apply`}
//                       className="btn btn-primary btn-sm"
//                     >
//                       Apply
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExploreJobs;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/api";


const ExploreJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/all");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h3 className="text-center mt-5">Loading Jobs...</h3>;

  return (
    <div className="explore container py-4">
      <h2 className="fw-bold mb-3">Find Your Dream Job 🚀</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search jobs..."
        className="search-box mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredJobs.length === 0 ? (
        <div className="empty-box">No jobs found</div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h5>{job.title}</h5>
              <p className="company">{job.company}</p>

              <div className="tags">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🧑‍💻 {job.experience}</span>
              </div>

              <div className="job-actions">
                <Link to={`/jobs/${job._id}`} className="btn btn-outline-dark btn-sm">
                  View
                </Link>

                <Link to={`/jobs/${job._id}/apply`} className="btn btn-dark btn-sm">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreJobs;
