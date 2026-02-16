import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await API.get(
          `/employer/jobs/${jobId}/applicants`
        );
        setApplicants(res.data);
      } catch (err) {
        alert("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  // 🔹 Update applicant status
  const updateStatus = async (applicantId, status) => {
    try {
      await API.put(
        `/employer/applications/${applicantId}/status`,
        { status }
      );
      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicantId ? { ...a, status } : a
        )
      );
    } catch (err) {
      alert("Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Job Applicants</h3>

      {applicants.length === 0 ? (
        <div className="alert alert-info">
          No applicants for this job yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>

                  <td>
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Resume
                    </a>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        applicant.status === "shortlisted"
                          ? "bg-success"
                          : applicant.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() =>
                        updateStatus(applicant._id, "shortlisted")
                      }
                      disabled={applicant.status === "shortlisted"}
                    >
                      Shortlist
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        updateStatus(applicant._id, "rejected")
                      }
                      disabled={applicant.status === "rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
