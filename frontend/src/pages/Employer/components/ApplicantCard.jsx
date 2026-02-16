import React from 'react';

const ApplicantCard = ({ applicant }) => {
  return (
    <div className="applicant-card">
      <div className="applicant-header">
        <div className="applicant-avatar">
          {applicant.name.charAt(0)}
        </div>
        <div className="applicant-info">
          <h3>{applicant.name}</h3>
          <p className="applicant-email">{applicant.email}</p>
          <p className="applicant-experience">🕒 {applicant.experience} experience</p>
        </div>
      </div>

      <div className="applicant-skills">
        <h4>Skills:</h4>
        <div className="skill-tags">
          {applicant.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="applicant-actions">
        <button className="view-resume-btn">📄 View Resume</button>
        <button className="shortlist-btn">⭐ Shortlist</button>
        <button className="reject-btn">❌ Reject</button>
      </div>
    </div>
  );
};

export default ApplicantCard;