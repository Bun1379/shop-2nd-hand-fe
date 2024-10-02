import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./AdminLayout.scss";
import SideBar from "../../components/Sidebar/Sidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const showBar = () => {
    setCollapsed(!collapsed);
  };

  // Kiểm tra quyền admin, nếu không phải admin, chuyển hướng về trang login
  if (localStorage.getItem("is_admin") !== "true") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => showBar()}>
            <FaBars className="left-side" />
          </span>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
