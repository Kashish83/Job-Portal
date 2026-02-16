import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/api";

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Debug logs
  console.log("=== DEBUG APPLY ===");
  console.log("Job ID:", id);
  console.log("Resume file:", resume);
  console.log("File type:", resume?.type);
  console.log("File size (MB):", (resume?.size / (1024*1024)).toFixed(2));
  
  try {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    
    console.log("Sending to:", `/apply/${id}`);
    
    const response = await API.post(`/apply/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    console.log("Response:", response.data);
    alert("Application submitted successfully!");
    navigate("/jobseeker/applications");
    
  } catch (err) {
    console.error("=== APPLY ERROR DETAILS ===");
    console.error("Full error:", err);
    console.error("Error message:", err.message);
    console.error("Response data:", err.response?.data);
    console.error("Status code:", err.response?.status);
    
    // Better error message
    if (err.response?.data?.message) {
      alert(`Error: ${err.response.data.message}`);
    } else {
      alert(`Error: ${err.message || "Something went wrong"}`);
    }
  }
};

  return (
    <div className="container mt-4">
      <h3>Apply for Job</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Upload Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="form-control"
            rows="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;