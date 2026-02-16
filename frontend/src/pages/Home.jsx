// // import { Link } from "react-router-dom";
// // import { getUser } from "../utils/auth";

// // export default function Home() {
// //   const user = getUser();

// //   return (
// //     <div className="container-fluid bg-light">
// //       {/* Hero Section */}
// //       <div
// //         className="container d-flex align-items-center justify-content-center"
// //         style={{ minHeight: "85vh" }}
// //       >
// //         <div className="text-center col-md-7">
// //           <h1 className="fw-bold mb-3">
// //             Find Your Dream Job Easily
// //           </h1>

// //           <p className="text-muted mb-4 fs-5">
// //             A smart job portal for job seekers and recruiters.
// //           </p>

// //           {!user ? (
// //             <div>
// //               <Link
// //                 to="/login"
// //                 className="btn btn-primary px-4 py-2 me-3"
// //               >
// //                 Login
// //               </Link>

// //               <Link
// //                 to="/signup"
// //                 className="btn btn-success px-4 py-2"
// //               >
// //                 Signup
// //               </Link>
// //             </div>
// //           ) : (
// //             <Link
// //               to="/dashboard"
// //               className="btn btn-dark px-4 py-2"
// //             >
// //               Go to Dashboard
// //             </Link>
// //           )}
// //         </div>
// //       </div>

// //       {/* Features Section */}
// //       <div className="container py-5">
// //         <div className="row text-center g-4">
// //           <div className="col-md-4">
// //             <div className="card p-4 shadow-sm h-100">
// //               <h5>For Job Seekers</h5>
// //               <p className="text-muted">
// //                 Browse jobs, apply easily, and track your applications.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="col-md-4">
// //             <div className="card p-4 shadow-sm h-100">
// //               <h5>For Recruiters</h5>
// //               <p className="text-muted">
// //                 Post jobs, manage listings, and hire faster.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="col-md-4">
// //             <div className="card p-4 shadow-sm h-100">
// //               <h5>Smart Platform</h5>
// //               <p className="text-muted">
// //                 Secure, fast, and user-friendly job portal.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

    
// //     </div>
// //   );
// // }



// import { Link } from "react-router-dom";
// import { getUser } from "../utils/auth";

// export default function Home() {
//   const user = getUser();

//   return (
//     <div className="bg-light">
//       {/* Hero Section - Full Width */}
//       <section className="hero-section py-5" style={{ 
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         minHeight: "85vh"
//       }}>
//         <div className="container py-5">
//           <div className="row align-items-center">
//             <div className="col-lg-6 text-white">
//               <h1 className="display-4 fw-bold mb-4">
//                 Find Your <span className="text-warning">Dream Job</span> Easily
//               </h1>
              
//               <p className="lead mb-4 fs-5" style={{ opacity: 0.9 }}>
//                 A smart job portal connecting talented professionals with top companies. 
//                 Thousands of jobs waiting for you.
//               </p>
              
//               <div className="d-flex flex-wrap gap-3 mb-4">
//                 <div className="d-flex align-items-center text-white">
//                   <i className="bi bi-check-circle-fill me-2"></i>
//                   <span>10,000+ Jobs</span>
//                 </div>
//                 <div className="d-flex align-items-center text-white">
//                   <i className="bi bi-check-circle-fill me-2"></i>
//                   <span>500+ Companies</span>
//                 </div>
//                 <div className="d-flex align-items-center text-white">
//                   <i className="bi bi-check-circle-fill me-2"></i>
//                   <span>Fast Applications</span>
//                 </div>
//               </div>

//               {!user ? (
//                 <div className="d-flex flex-wrap gap-3">
//                   <Link
//                     to="/signup"
//                     className="btn btn-light btn-lg px-5 py-3 fw-bold shadow"
//                   >
//                     Get Started Free
//                     <i className="bi bi-arrow-right ms-2"></i>
//                   </Link>
//                   <Link
//                     to="/jobs"
//                     className="btn btn-outline-light btn-lg px-4 py-3"
//                   >
//                     Browse Jobs
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="d-flex flex-wrap gap-3">
//                   <Link
//                     to="/jobs"
//                     className="btn btn-light btn-lg px-5 py-3 fw-bold"
//                   >
//                     Find Jobs
//                   </Link>
//                   <Link
//                     to="/dashboard"
//                     className="btn btn-outline-light btn-lg px-4 py-3"
//                   >
//                     Go to Dashboard
//                   </Link>
//                 </div>
//               )}
//             </div>
            
//             <div className="col-lg-6 mt-5 mt-lg-0">
//               <div className="bg-white rounded shadow-lg p-4">
//                 <img 
//                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
//                   alt="Job Search" 
//                   className="img-fluid rounded"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Improved */}
//       <section className="py-5 bg-white">
//         <div className="container py-5">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold display-5 mb-3">Why Choose JobPortal?</h2>
//             <p className="text-muted lead">Everything you need for your career journey in one platform</p>
//           </div>
          
//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="card border-0 shadow-sm h-100 hover-lift transition-all">
//                 <div className="card-body p-4 text-center">
//                   <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
//                     <i className="bi bi-search-heart fs-2 text-primary"></i>
//                   </div>
//                   <h4 className="card-title fw-bold mb-3">Smart Job Search</h4>
//                   <p className="card-text text-muted">
//                     AI-powered job matching, personalized recommendations, and one-click applications.
//                   </p>
//                   <ul className="list-unstyled text-start mt-3">
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Personalized job alerts
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Advanced filters
//                     </li>
//                     <li>
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Save jobs feature
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card border-0 shadow-sm h-100 hover-lift transition-all">
//                 <div className="card-body p-4 text-center">
//                   <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
//                     <i className="bi bi-briefcase fs-2 text-success"></i>
//                   </div>
//                   <h4 className="card-title fw-bold mb-3">For Recruiters</h4>
//                   <p className="card-text text-muted">
//                     Post jobs, manage candidates, schedule interviews, and hire top talent efficiently.
//                   </p>
//                   <ul className="list-unstyled text-start mt-3">
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Easy job posting
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Candidate tracking
//                     </li>
//                     <li>
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Analytics dashboard
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card border-0 shadow-sm h-100 hover-lift transition-all">
//                 <div className="card-body p-4 text-center">
//                   <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
//                     <i className="bi bi-shield-check fs-2 text-warning"></i>
//                   </div>
//                   <h4 className="card-title fw-bold mb-3">Secure & Reliable</h4>
//                   <p className="card-text text-muted">
//                     Bank-level security, verified profiles, and 24/7 support for all your needs.
//                   </p>
//                   <ul className="list-unstyled text-start mt-3">
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Data encryption
//                     </li>
//                     <li className="mb-2">
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       Profile verification
//                     </li>
//                     <li>
//                       <i className="bi bi-check-circle text-success me-2"></i>
//                       24/7 support
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-5 bg-primary text-white">
//         <div className="container py-5">
//           <div className="row text-center g-4">
//             <div className="col-md-3">
//               <h2 className="display-4 fw-bold">10K+</h2>
//               <p className="mb-0">Active Jobs</p>
//             </div>
//             <div className="col-md-3">
//               <h2 className="display-4 fw-bold">500+</h2>
//               <p className="mb-0">Top Companies</p>
//             </div>
//             <div className="col-md-3">
//               <h2 className="display-4 fw-bold">50K+</h2>
//               <p className="mb-0">Members</p>
//             </div>
//             <div className="col-md-3">
//               <h2 className="display-4 fw-bold">95%</h2>
//               <p className="mb-0">Success Rate</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-5 bg-light">
//         <div className="container py-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-8 text-center">
//               <h2 className="fw-bold mb-4">Ready to Take the Next Step?</h2>
//               <p className="lead text-muted mb-4">
//                 Join thousands of professionals who found their dream job through JobPortal
//               </p>
//               {!user ? (
//                 <div className="d-flex flex-wrap justify-content-center gap-3">
//                   <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3">
//                     Create Free Account
//                   </Link>
//                   <Link to="/login" className="btn btn-outline-dark btn-lg px-5 py-3">
//                     Already have account? Login
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="d-flex flex-wrap justify-content-center gap-3">
//                   <Link to="/jobs" className="btn btn-primary btn-lg px-5 py-3">
//                     Browse All Jobs
//                   </Link>
//                   <Link to="/profile" className="btn btn-outline-primary btn-lg px-5 py-3">
//                     Complete Your Profile
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }