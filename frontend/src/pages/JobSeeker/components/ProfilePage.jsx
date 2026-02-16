import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    experience: "",
    resume: ""
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/jobseeker/profile");
        setProfile(res.data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // Resume upload
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Select resume first");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      await API.post("/jobseeker/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Resume uploaded successfully");
    } catch (err) {
      alert("Resume upload failed");
    }
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/jobseeker/profile", profile);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">My Profile</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Email</label>
                <input
                  className="form-control"
                  value={profile.email}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Location</label>
                <input
                  className="form-control"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label>Skills</label>
              <input
                className="form-control"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="React, Node, MongoDB"
              />
            </div>

            <div className="mb-3">
              <label>Experience</label>
              <input
                className="form-control"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <hr />

          {/* Resume Upload */}
          <form onSubmit={handleResumeUpload}>
            <label>Upload Resume</label>
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
            <button className="btn btn-outline-primary">
              Upload Resume
            </button>
          </form>

          {profile.resume && (
            <p className="mt-2">
              Current Resume:{" "}
              <a href={`/uploads/${profile.resume}`} target="_blank">
                View Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
