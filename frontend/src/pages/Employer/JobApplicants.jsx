import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Fetch applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const res = await API.get(
          `/employer/applications/${jobId}`
        );
        setApplicants(res.data);
        setErrorMsg("");
      } catch (err) {
        setErrorMsg("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  // ✅ Update applicant status
  const updateStatus = async (applicationId, status) => {
    setUpdatingId(applicationId);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await API.put(
        `/employer/applications/${applicationId}/status`,
        { status }
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

      setSuccessMsg(`Applicant ${status} successfully!`);
    } catch (err) {
      setErrorMsg("Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Job Applicants</h3>

      {errorMsg && (
        <div className="alert alert-danger">{errorMsg}</div>
      )}

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {applicants.length === 0 ? (
        <div className="alert alert-info">
          No applicants for this job yet.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table modern-table mb-0">
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
                  <td>
                    {applicant.applicant?.name || "N/A"}
                  </td>

                  <td>
                    {applicant.applicant?.email || "N/A"}
                  </td>

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
                      className={`badge status-badge ${applicant.status}`}
                    >
                      {applicant.status
                        ? applicant.status.charAt(0).toUpperCase() +
                          applicant.status.slice(1)
                        : "Pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() =>
                        updateStatus(
                          applicant._id,
                          "shortlisted"
                        )
                      }
                      disabled={
                        applicant.status ===
                          "shortlisted" ||
                        updatingId === applicant._id
                      }
                    >
                      {updatingId === applicant._id &&
                      applicant.status !==
                        "shortlisted" ? (
                        <span className="spinner-border spinner-border-sm me-1"></span>
                      ) : null}
                      Shortlist
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        updateStatus(
                          applicant._id,
                          "rejected"
                        )
                      }
                      disabled={
                        applicant.status ===
                          "rejected" ||
                        updatingId === applicant._id
                      }
                    >
                      {updatingId === applicant._id &&
                      applicant.status !==
                        "rejected" ? (
                        <span className="spinner-border spinner-border-sm me-1"></span>
                      ) : null}
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