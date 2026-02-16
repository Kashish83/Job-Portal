import { useEffect, useState } from "react";
import API from "../utils/api";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loadingJobId, setLoadingJobId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/all");
        setJobs(res.data.jobs);
      } catch (err) {
        setError("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Apply job
  const applyJob = async (jobId) => {
    if (!resume) {
      setError("Please upload resume before applying");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoadingJobId(jobId);
      setError("");
      setSuccess("");

      await API.post(`/apply/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Applied successfully ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Apply failed");
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Available Jobs</h2>

      {/* Alerts */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Resume Upload */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Upload Resume</h5>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />
          <small className="text-muted">
            Upload once. PDF only.
          </small>
        </div>
      </div>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p className="text-center text-muted">No jobs available</p>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-6" key={job._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text text-muted">
                    {job.description}
                  </p>

                  <p className="mb-1">
                    <b>Location:</b> {job.location}
                  </p>
                  <p className="mb-3">
                    <b>Posted by:</b> {job.postedBy?.name || "Company"}
                  </p>

                  <button
                    className="btn btn-primary"
                    disabled={loadingJobId === job._id}
                    onClick={() => applyJob(job._id)}
                  >
                    {loadingJobId === job._id
                      ? "Applying..."
                      : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;
