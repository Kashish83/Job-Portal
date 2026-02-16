import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await API.get("/applications/my");
        setAppliedJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch applied jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Applied Jobs</h2>

      {appliedJobs.length === 0 ? (
        <div className="alert alert-info">
          You haven't applied to any jobs yet.
        </div>
      ) : (
        appliedJobs.map((item) => (
          <div className="card mb-3 shadow-sm" key={item._id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{item.job.title}</h5>
                <span
                  className={`badge ${
                    item.status === "Pending"
                      ? "bg-warning"
                      : item.status === "Rejected"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h6 className="card-subtitle mb-2 text-muted">
                {item.job.company}
              </h6>

              <p className="mb-1">📍 {item.job.location}</p>
              <p className="mb-1">💰 {item.job.salary}</p>
              <p className="text-muted">
                Applied on: {new Date(item.appliedAt).toLocaleDateString()}
              </p>

              <button className="btn btn-outline-primary btn-sm">
                View Job
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
