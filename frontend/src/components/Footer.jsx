import { Link } from "react-router-dom";
import "../styles/footer.css"
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">
          {/* Brand */}
          <div className="footer-col">
            <h2 className="logo">JobPortal</h2>
            <p>
              Connecting talented professionals with top companies worldwide.
              Your career journey starts here 🚀
            </p>

            <div className="socials">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>

          {/* Job Seekers */}
          <div className="footer-col">
            <h4>Job Seekers</h4>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/resume-analyzer">Resume Analyzer</Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
          </div>

          {/* Recruiters */}
          <div className="footer-col">
            <h4>Recruiters</h4>
            <Link to="/employer/dashboard">Dashboard</Link>
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/manage-jobs">Manage Jobs</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <p>📧 support@jobportal.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Noida, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} JobPortal. All rights reserved.</p>

          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
