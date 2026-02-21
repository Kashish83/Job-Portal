import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "../../styles/employer.css";
const EmployerLayout = () => {
  return (
    <div className="employer-layout">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="employer-main">
        <Outlet />
      </div>

    </div>
  );
};

export default EmployerLayout;
