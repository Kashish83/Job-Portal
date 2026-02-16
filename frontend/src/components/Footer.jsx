// import { Link } from "react-router-dom";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-dark text-light pt-5 pb-4 mt-5">
//       <div className="container">
//         <div className="row">
//           {/* Brand & Description */}
//           <div className="col-lg-4 col-md-6 mb-4">
//             <div className="d-flex align-items-center gap-2 mb-3">
//               <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
//                    style={{ width: "40px", height: "40px" }}>
//                 <i className="bi bi-briefcase text-white fs-5"></i>
//               </div>
//               <h4 className="fw-bold text-white mb-0">JobPortal</h4>
//             </div>
//             <p className="text-light opacity-75 mb-4" style={{ maxWidth: "300px" }}>
//               Connecting talented professionals with top companies worldwide. Your career journey starts here.
//             </p>
//             <div className="d-flex gap-3">
//               <a href="#" className="text-light opacity-75 fs-5">
//                 <i className="bi bi-facebook"></i>
//               </a>
//               <a href="#" className="text-light opacity-75 fs-5">
//                 <i className="bi bi-twitter"></i>
//               </a>
//               <a href="#" className="text-light opacity-75 fs-5">
//                 <i className="bi bi-linkedin"></i>
//               </a>
//               <a href="#" className="text-light opacity-75 fs-5">
//                 <i className="bi bi-instagram"></i>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <h5 className="text-white fw-bold mb-3">Job Seekers</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2">
//                 <Link to="/jobs" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Browse Jobs
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/companies" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Companies
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/career-advice" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Career Advice
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/resume-builder" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Resume Builder
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* For Recruiters */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <h5 className="text-white fw-bold mb-3">Recruiters</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2">
//                 <Link to="/post-job" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Post a Job
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/pricing" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Pricing
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/employer-dashboard" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Employer Dashboard
//                 </Link>
//               </li>
//               <li className="mb-2">
//                 <Link to="/candidate-search" className="text-light opacity-75 text-decoration-none hover-text-primary">
//                   Search Candidates
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact & Legal */}
//           <div className="col-lg-4 col-md-6 mb-4">
//             <h5 className="text-white fw-bold mb-3">Contact Us</h5>
//             <ul className="list-unstyled">
//               <li className="mb-3 d-flex align-items-start gap-2">
//                 <i className="bi bi-envelope text-primary mt-1"></i>
//                 <div>
//                   <p className="mb-0 fw-medium">Email</p>
//                   <a href="mailto:support@jobportal.com" className="text-light opacity-75 text-decoration-none">
//                     support@jobportal.com
//                   </a>
//                 </div>
//               </li>
//               <li className="mb-3 d-flex align-items-start gap-2">
//                 <i className="bi bi-telephone text-primary mt-1"></i>
//                 <div>
//                   <p className="mb-0 fw-medium">Phone</p>
//                   <a href="tel:+919876543210" className="text-light opacity-75 text-decoration-none">
//                     +91 98765 43210
//                   </a>
//                 </div>
//               </li>
//               <li className="mb-3 d-flex align-items-start gap-2">
//                 <i className="bi bi-geo-alt text-primary mt-1"></i>
//                 <div>
//                   <p className="mb-0 fw-medium">Address</p>
//                   <p className="text-light opacity-75 mb-0">123 Tech Park, Sector 62, Noida, India</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="border-secondary my-4" />

//         {/* Bottom Row */}
//         <div className="row align-items-center">
//           <div className="col-md-6 mb-3 mb-md-0">
//             <ul className="list-inline mb-0">
//               <li className="list-inline-item">
//                 <Link to="/privacy" className="text-light opacity-75 text-decoration-none">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li className="list-inline-item mx-3">•</li>
//               <li className="list-inline-item">
//                 <Link to="/terms" className="text-light opacity-75 text-decoration-none">
//                   Terms of Service
//                 </Link>
//               </li>
//               <li className="list-inline-item mx-3">•</li>
//               <li className="list-inline-item">
//                 <Link to="/cookies" className="text-light opacity-75 text-decoration-none">
//                   Cookie Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="col-md-6 text-md-end">
//             <p className="text-light opacity-75 mb-0">
//               © {currentYear} JobPortal. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-lg-4">
            <h3 className="logo">JobPortal</h3>
            <p className="footer-text">
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
          <div className="col-lg-2">
            <h6>Job Seekers</h6>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/resume-analyzer">Resume Analyzer</Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
          </div>

          {/* Recruiters */}
          <div className="col-lg-2">
            <h6>Recruiters</h6>
            <Link to="/employer/dashboard">Dashboard</Link>
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/manage-jobs">Manage Jobs</Link>
          </div>

          {/* Contact */}
          <div className="col-lg-4">
            <h6>Contact</h6>
            <p>📧 support@jobportal.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Noida, India</p>
          </div>
        </div>

        <hr />

        <div className="bottom">
          <p>© {year} JobPortal. All rights reserved.</p>
          <div className="links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
