// import React, { useEffect, useState } from "react";
// import API from "../../../utils/api";
// import { Link } from "react-router-dom";

// const SavedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
//       try {
//         const res = await API.get("/jobseeker/saved-jobs");
//         setJobs(res.data);
//       } catch (err) {
//         alert("Failed to load saved jobs");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSavedJobs();
//   }, []);

//   const removeJob = async (jobId) => {
//     if (!window.confirm("Remove this job?")) return;
//     try {
//       await API.delete(`/jobseeker/remove-saved/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (err) {
//       alert("Failed to remove job");
//     }
//   };

//   if (loading) return <div className="text-center mt-4">Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">Saved Jobs</h4>

//       {jobs.length === 0 ? (
//         <p>No saved jobs yet</p>
//       ) : (
//         jobs.map((job) => (
//           <div className="card mb-3 shadow-sm" key={job._id}>
//             <div className="card-body">
//               <h5>{job.title}</h5>
//               <p>{job.company?.name}</p>
//               <p>📍 {job.location}</p>

//               <Link
//                 to={`/jobseeker/job/${job._id}`}
//                 className="btn btn-sm btn-primary me-2"
//               >
//                 View
//               </Link>

//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={() => removeJob(job._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SavedJobs;


import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import { Link } from "react-router-dom";


const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await API.get("/jobseeker/saved-jobs");
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
      await API.delete(`/jobseeker/remove-saved/${jobId}`);
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
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              
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
