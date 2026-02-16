import { Link } from "react-router-dom";
import { getUser } from "../../utils/auth";

export default function Hero() {
  const user = getUser();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 hero-left">
            <h1 className="hero-title">
              Find Your <span>Dream Job</span> Faster
            </h1>

            <p className="hero-sub">
              AI powered job portal connecting talented professionals with top companies worldwide.
            </p>

            {!user ? (
              <div className="hero-buttons">
                <Link to="/signup" className="btn hero-btn-primary">
                  Get Started Free
                </Link>
                <Link to="/jobs" className="btn hero-btn-secondary">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="hero-buttons">
                <Link to="/jobs" className="btn hero-btn-primary">
                  Find Jobs
                </Link>
                <Link
                  to={user.role === "employer" ? "/employer/dashboard" : "/jobseeker/dashboard"}
                  className="btn hero-btn-secondary"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              className="hero-img"
              alt="hero"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
