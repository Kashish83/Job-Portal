import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css"; // import the CSS

const JobCard = ({ job, onEdit, onDelete }) => {
  // Default handlers if not passed
  const handleEdit = () => {
    if (onEdit) {
      onEdit(job.id);
    } else {
      alert(`Edit job: ${job.title}`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(job.id);
    } else {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${job.title}"?`
      );
      if (confirmDelete) {
        alert(`Deleted job: ${job.title}`);
      }
    }
  };

  return (
    <div className="job-card-employer">
      {/* Header */}
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={`job-status ${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      {/* Job Details */}
      <div className="job-details">
        <p>📍 {job.location}</p>
        <p>💰 {job.salary}</p>
        <p>🕒 Posted: {job.date}</p>
      </div>

      {/* Applicants */}
      <div className="job-applicants">
        <Link
          to={`/employer/job-applicants/${job.id}`}
          className="applicants-link"
        >
          👥 {job.applicants} applicants
        </Link>
      </div>

      {/* Actions */}
      <div className="job-actions">
        <Link
          to={`/employer/job-applicants/${job.id}`}
          className="action-btn view-btn"
        >
          View Applicants
        </Link>
        <button className="action-btn edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="action-btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
