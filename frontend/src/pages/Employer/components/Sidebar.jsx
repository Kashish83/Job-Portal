import { NavLink } from "react-router-dom";
import "../../../styles/employer.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Employer Panel</h2>

      <nav className="sidebar-links">

        <NavLink to="/employer/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/employer/post-job" className="sidebar-link">
           Post Job
        </NavLink>

        <NavLink to="/employer/manage-jobs" className="sidebar-link">
           Manage Jobs
        </NavLink>

        <NavLink to="/employer/company-profile" className="sidebar-link">
           Company Profile
        </NavLink>

        <NavLink to="/employer/settings" className="sidebar-link">
          ⚙ Settings
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
