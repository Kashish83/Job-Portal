// import { Link, useNavigate } from "react-router-dom";
// import { getUser, logoutUser } from "../utils/auth";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const user = getUser();

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg modern-navbar fixed-top">
//       <div className="container">

//         {/* LEFT LOGO */}
//         <Link className="navbar-brand brand" to="/">
//           JobPortal
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navMenu"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* CENTER LINKS */}
//         <div className="collapse navbar-collapse" id="navMenu">
//           <ul className="navbar-nav mx-auto gap-lg-5">
//             <li className="nav-item">
//               <Link className="nav-link nav-modern" to="/jobs">Find Jobs</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link nav-modern" to="/resume-analyzer">
//                 Resume Analyzer
//               </Link>
//             </li>
//           </ul>

//           {/* RIGHT SIDE */}
//           <ul className="navbar-nav align-items-center gap-lg-3">

//             {!user && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link nav-modern" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="btn btn-primary px-4" to="/signup">
//                     Sign up
//                   </Link>
//                 </li>
//               </>
//             )}

//             {user && (
//               <>
//                 {user.role === "jobseeker" && (
//                   <li className="nav-item">
//                     <Link className="nav-link nav-modern" to="/jobseeker/dashboard">
//                       Dashboard
//                     </Link>
//                   </li>
//                 )}

//                 {user.role === "employer" && (
//                   <li className="nav-item">
//                     <Link className="nav-link nav-modern" to="/employer/dashboard">
//                       Dashboard
//                     </Link>
//                   </li>
//                 )}

//                 <li className="nav-item">
//                   <button className="btn btn-outline-danger" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}

//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg modern-navbar fixed-top">
      <div className="container">
        {/* LEFT LOGO */}
        <Link className="navbar-brand brand" to="/">
          JobPortal
        </Link>

        <button
          className="navbar-toggler modern-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER LINKS */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-lg-5">
            <li className="nav-item">
              <Link className="nav-link nav-modern" to="/jobs">
                Find Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-modern" to="/resume-analyzer">
                Resume Analyzer
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav align-items-center gap-lg-3">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-modern" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary-modern px-4" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                {user.role === "jobseeker" && (
                  <li className="nav-item">
                    <Link className="nav-link nav-modern" to="/jobseeker/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                {user.role === "employer" && (
                  <li className="nav-item">
                    <Link className="nav-link nav-modern" to="/employer/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button className="btn btn-logout-modern" onClick={handleLogout}>
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
