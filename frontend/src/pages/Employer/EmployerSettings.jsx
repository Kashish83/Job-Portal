import React, { useEffect, useState } from "react";
import API from "../../utils/api";

const EmployerSettings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    notifications: true
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch employer settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/employer/settings");
        setUser(res.data);
      } catch (err) {
        alert("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  // 🔹 Handle account change
  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 🔹 Handle password change
  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Save settings
  const saveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/employer/settings", user);
      alert("Settings updated");
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Change password
  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/employer/change-password", passwords);
      alert("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Employer Settings</h3>

      {/* Account Info */}
      <div className="card mb-4 shadow">
        <div className="card-header bg-dark text-white">
          Account Information
        </div>

        <div className="card-body">
          <form onSubmit={saveSettings}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleUserChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                disabled
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="notifications"
                checked={user.notifications}
                onChange={handleUserChange}
              />
              <label className="form-check-label">
                Email Notifications
              </label>
            </div>

            <button className="btn btn-primary" disabled={loading}>
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="card shadow">
        <div className="card-header bg-warning">
          Change Password
        </div>

        <div className="card-body">
          <form onSubmit={changePassword}>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button className="btn btn-warning" disabled={loading}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerSettings;
