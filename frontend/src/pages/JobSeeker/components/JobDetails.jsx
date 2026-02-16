import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../utils/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        alert("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="alert alert-danger">Job not found</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3>{job.title}</h3>
          <h5 className="text-muted">{job.company}</h5>

          <hr />

          <p>📍 <strong>Location:</strong> {job.location}</p>
          <p>💰 <strong>Salary:</strong> {job.salary}</p>
          <p>🧑‍💼 <strong>Experience:</strong> {job.experience}</p>

          <hr />

          <h5>Job Description</h5>
          <p>{job.description}</p>

          <h5>Required Skills</h5>
          <ul>
            {job.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <div className="mt-4">
            <Link
              to={`/jobs/${job._id}/apply`}
              className="btn btn-primary"
            >
              Apply Now
            </Link>

            <Link
              to="/jobs"
              className="btn btn-outline-secondary ms-2"
            >
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
