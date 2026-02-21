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

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Fetch employer settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/employer/settings");
        setUser(res.data);
      } catch (err) {
        setErrorMsg("Failed to load settings");
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

  // 🔹 Save account settings
  const saveSettings = async (e) => {
    e.preventDefault();
    setLoadingUser(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await API.put("/employer/settings", user);
      setSuccessMsg("Settings updated successfully!");
    } catch (err) {
      setErrorMsg("Failed to update settings");
    } finally {
      setLoadingUser(false);
    }
  };

  // 🔹 Change password
  const changePassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    setSuccessMsg("");
    setErrorMsg("");

    // Simple password validation
    if (passwords.newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long");
      setLoadingPassword(false);
      return;
    }

    try {
      await API.put("/employer/change-password", passwords);
      setSuccessMsg("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setErrorMsg("Password change failed");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Employer Settings</h3>

      {/* Success / Error Messages */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* Account Information */}
      <div className="card mb-4 shadow">
        <div className="card-header bg-dark text-white">Account Information</div>
        <div className="card-body">
          <form onSubmit={saveSettings}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
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
                id="notifications"
                checked={user.notifications}
                onChange={handleUserChange}
              />
              <label className="form-check-label" htmlFor="notifications">
                Email Notifications
              </label>
            </div>

            <button className="btn btn-primary" disabled={loadingUser}>
              {loadingUser ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="card shadow">
        <div className="card-header bg-warning">Change Password</div>
        <div className="card-body">
          <form onSubmit={changePassword}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">Old Password</label>
              <input
                id="oldPassword"
                type="password"
                className="form-control"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="form-control"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
              <div className="form-text">Must be at least 6 characters long</div>
            </div>

            <button className="btn btn-warning" disabled={loadingPassword}>
              {loadingPassword ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerSettings;
