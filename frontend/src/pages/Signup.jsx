// import {useState} from"react";
// import {useNavigate} from "react-router-dom";
// import api from "../utils/api";

// export default function Signup(){
// const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "jobseeker",
//   });

// const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/signup", form);
//       alert(res.data.message || "Signup successful");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

// return(
//     <div className="container mt-5">
//         <div className="card p-4 col-md-6 mx-auto">
//             <h3 className="text-center mb-3">Create Account</h3>

//             <form onSubmit={handleSubmit}>
//                  <input
//             className="form-control mb-3"
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />

//           <input
//             className="form-control mb-3"
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />

//           <select
//             className="form-control mb-3"
//             name="role"
//             onChange={handleChange}
//           >
//             <option value="jobseeker">Job Seeker</option>
//             <option value="employer">employer</option>
//           </select>

//           <button className="btn btn-success w-100" disabled={loading}>
//             {loading ? "Signing up..." : "Signup"}
//           </button>
//             </form>
//         </div>
//     </div>
// );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/signup", form);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-3">Create Account</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                disabled={loading}
              />

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
                className="form-control mb-2"
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                onChange={handleChange}
                required
                disabled={loading}
              />
              <small className="text-muted d-block mb-3">
                Use a strong password
              </small>

              <select
                className="form-select mb-3"
                name="role"
                onChange={handleChange}
                disabled={loading}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>

              <button
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Signup"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
