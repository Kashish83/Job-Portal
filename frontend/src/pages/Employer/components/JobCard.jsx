import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card-employer">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="job-status">{job.status}</span>
      </div>
      
      <div className="job-details">
        <p>📍 {job.location}</p>
        <p>💰 {job.salary}</p>
        <p>🕒 Posted: {job.date}</p>
      </div>

      <div className="job-applicants">
        <Link to={`/employer/job-applicants/${job.id}`} className="applicants-link">
          👥 {job.applicants} applicants
        </Link>
      </div>

      <div className="job-actions">
        <Link to={`/employer/job-applicants/${job.id}`} className="action-btn view-btn">
          View Applicants
        </Link>
        <button className="action-btn edit-btn">Edit</button>
        <button className="action-btn delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default JobCard;