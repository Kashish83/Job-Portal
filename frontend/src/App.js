// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Common pages
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AllJobs from "./pages/AllJobs";

// // Employer pages
// import EmployerDashboard from "./pages/Employer/EmployerDashboard";
// import PostJob from "./pages/Employer/PostJob";
// import ManageJobs from "./pages/Employer/ManageJobs";
// import JobApplicants from "./pages/Employer/JobApplicants";
// import CompanyProfile from "./pages/Employer/CompanyProfile";
// import EmployerSettings from "./pages/Employer/EmployerSettings";
// import EmployerLayout from "./pages/Employer/EmployerLayout";
// // JobSeeker pages
// import JobSeekerDashboard from "./pages/JobSeeker/components/JobSeekerDashboard";
// import ExploreJobs from "./pages/JobSeeker/components/ExploreJobs";
// import JobDetails from "./pages/JobSeeker/components/JobDetails";
// import AppliedJobs from "./pages/JobSeeker/components/AppliedJobs";
// import SavedJobs from "./pages/JobSeeker/components/SavedJobs";
// import ResumeAnalyzer from "./pages/JobSeeker/components/ResumeAnalyzer";
// import ProfilePage from "./pages/JobSeeker/components/ProfilePage";
// import ApplyPage from "./pages/JobSeeker/components/ApplyPage"; // ✅ IMPORT ADDED

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* ===== Common ===== */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/all-jobs" element={<AllJobs />} />

//    <Routes>
//   {/* ===== Employer ===== */}
//   <Route path="/employer" element={<EmployerLayout />}>
//     <Route path="dashboard" element={<EmployerDashboard />} />
//     <Route path="post-job" element={<PostJob />} />
//     <Route path="manage-jobs" element={<ManageJobs />} />
//     <Route path="job-applicants/:jobId" element={<JobApplicants />} />
//     <Route path="company-profile" element={<CompanyProfile />} />
//     <Route path="settings" element={<EmployerSettings />} />
//   </Route>
// </Routes>

//         {/* ===== JobSeeker ===== */}
//         <Route
//           path="/jobseeker/dashboard"
//           element={<JobSeekerDashboard />}
//         />
//         <Route path="/jobs" element={<ExploreJobs />} />
//         <Route path="/jobs/:id" element={<JobDetails />} />
//         <Route path="/jobs/:id/apply" element={<ApplyPage />} /> {/* ✅ ROUTE ADDED */}
//         <Route path="/applied-jobs" element={<AppliedJobs />} />
//         <Route path="/saved-jobs" element={<SavedJobs />} />
//         <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/employer.css';
import './styles/navbar.css';
import './styles/footer.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllJobs from "./pages/AllJobs";

// Employer pages
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import PostJob from "./pages/Employer/PostJob";
import ManageJobs from "./pages/Employer/ManageJobs";
import JobApplicants from "./pages/Employer/JobApplicants";
import CompanyProfile from "./pages/Employer/CompanyProfile";
import EmployerSettings from "./pages/Employer/EmployerSettings";
import EmployerLayout from "./pages/Employer/EmployerLayout";

// JobSeeker pages
import JobSeekerDashboard from "./pages/JobSeeker/components/JobSeekerDashboard";
import ExploreJobs from "./pages/JobSeeker/components/ExploreJobs";
import JobDetails from "./pages/JobSeeker/components/JobDetails";
import AppliedJobs from "./pages/JobSeeker/components/AppliedJobs";
import SavedJobs from "./pages/JobSeeker/components/SavedJobs";
import ResumeAnalyzer from "./pages/JobSeeker/components/ResumeAnalyzer";
import ProfilePage from "./pages/JobSeeker/components/ProfilePage";
import ApplyPage from "./pages/JobSeeker/components/ApplyPage";

// Common components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== Common ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-jobs" element={<AllJobs />} />

        {/* ===== Employer ===== */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="job-applicants/:jobId" element={<JobApplicants />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="settings" element={<EmployerSettings />} />
        </Route>

        {/* ===== JobSeeker ===== */}
        <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/jobs" element={<ExploreJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/apply" element={<ApplyPage />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
