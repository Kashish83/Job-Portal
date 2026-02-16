import { Link } from "react-router-dom";
import { getUser } from "../../utils/auth";

export default function CTA() {
  const user = getUser();

  return (
    <section className="py-5 bg-light">
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Ready to Take the Next Step?</h2>
        <p className="text-muted mb-4">
          Join thousands of professionals who found jobs through us.
        </p>

        {!user ? (
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/signup" className="btn btn-primary btn-lg px-5">
              Create Account
            </Link>
            <Link to="/login" className="btn btn-outline-dark btn-lg px-5">
              Login
            </Link>
          </div>
        ) : (
          <Link to="/jobs" className="btn btn-primary btn-lg px-5">
            Browse Jobs
          </Link>
        )}
      </div>
    </section>
  );
}
