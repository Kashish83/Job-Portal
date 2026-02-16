import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { setUser } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);
const { token, ...user } = res.data;   // 👈 YEH MISS THA
  setUser(user, token);  
     
      // role-based redirect
      if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-3">Login</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                disabled={loading}
              />

              <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                disabled={loading}
              />

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              New here?{" "}
              <Link to="/signup" className="fw-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
