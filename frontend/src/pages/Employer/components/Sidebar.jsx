// D:\resume analyzer\frontend\src\pages\Employer\components\Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="font-bold text-xl mb-6">Employer Panel</h2>
      <ul>
        <li className="mb-2"><Link to="/employer/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
        <li className="mb-2"><Link to="/employer/Postjob" className="hover:text-blue-500">Post Job</Link></li>
        <li className="mb-2"><Link to="/employer/manage-jobs" className="hover:text-blue-500">Manage Jobs</Link></li>
        <li className="mb-2"><Link to="/employer/company-profile" className="hover:text-blue-500">Company Profile</Link></li>
        <li className="mb-2"><Link to="/employer/settings" className="hover:text-blue-500">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
