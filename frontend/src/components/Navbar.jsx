import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";
import { getUser, logoutUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg premium-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand brand-logo" to="/">
          Job<span>Portal</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-lg-4 text-center">

            <li className="nav-item">
              <NavLink className="nav-link premium-link" to="/jobs">
                Find Jobs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link premium-link" to="/resume-analyzer">
                Resume Analyzer
              </NavLink>
            </li>

          </ul>

          <ul className="navbar-nav align-items-center gap-lg-3 text-center">

            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link premium-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="btn btn-gradient" to="/signup">
                    Get Started
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link premium-link"
                    to={`/${user.role}/dashboard`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button className="btn btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
