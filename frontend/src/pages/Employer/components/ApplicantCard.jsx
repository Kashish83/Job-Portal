import React from "react";

const ApplicantCard = ({ applicant, onShortlist, onReject, onViewResume }) => {
  if (!applicant) return null;

  const {
    name = "Unknown",
    email = "N/A",
    experience = "0 yrs",
    skills = [],
    status = "pending"
  } = applicant;

  return (
    <div className="applicant-card">

      {/* HEADER */}
      <div className="applicant-header">
        <div className="applicant-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="applicant-info">
          <h3>{name}</h3>
          <p className="applicant-email">{email}</p>
          <p className="applicant-experience">
            🕒 {experience} experience
          </p>
        </div>

        <span className={`applicant-status status-${status}`}>
          {status}
        </span>
      </div>

      {/* SKILLS */}
      {skills.length > 0 && (
        <div className="applicant-skills">
          <h4>Skills</h4>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="applicant-actions">
        <button
          className="view-resume-btn"
          onClick={() => onViewResume?.(applicant)}
        >
          📄 Resume
        </button>

        <button
          className="shortlist-btn"
          onClick={() => onShortlist?.(applicant)}
        >
          ⭐ Shortlist
        </button>

        <button
          className="reject-btn"
          onClick={() => onReject?.(applicant)}
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
