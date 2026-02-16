import React, { useState } from "react";
import API from "../../../utils/api";

const Certifications = ({ profile, refreshProfile }) => {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    year: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await API.post("/profile/certifications", form);
    alert("Certification Added");
    refreshProfile();
  };

  const handleDelete = async (id) => {
    await API.delete(`/profile/certifications/${id}`);
    refreshProfile();
  };

  return (
    <div>
      <h4>Add Certification</h4>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        name="organization"
        placeholder="Organization"
        onChange={handleChange}
      />
      <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
      />

      <button onClick={handleAdd}>Add</button>

      <hr />

      <h4>My Certifications</h4>

      {profile.certifications?.map((cert) => (
        <div key={cert._id}>
          <strong>{cert.title}</strong> - {cert.organization} ({cert.year})
          <button onClick={() => handleDelete(cert._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
