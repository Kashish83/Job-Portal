import React, { useEffect, useState } from "react";
import API from "../../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get("/profile/me");
      setProfile(data.profile);
      setCompletion(data.completion);
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-4">

      <h2>My Profile</h2>

      {/* Completion Bar */}
      <div className="progress mb-3">
        <div
          className="progress-bar"
          style={{ width: `${completion}%` }}
        >
          {completion}%
        </div>
      </div>

      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Skills:</strong> {profile.skills?.join(", ")}</p>

    </div>
  );
};

export default Profile;
