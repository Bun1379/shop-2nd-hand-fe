import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";
import UpdateUser from "./UpdateUser";
import Order from "../Order/Order";
import Notification from "../Notification/Notification";
import PurchasedProducts from "../Review/PurchasedProducts";
import Favoutite from "../Favourite/Favourite";
import Discount from "../Discount/Discount";
import UpdatePassword from "./UpdatePassword";
import Address from "../Address/Address";
import CancelRequest from "../CancelRequest/CancelRequest";

const UserAccount = ({ initialSection }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeSection, setActiveSection] = useState(
    location.state?.initialSection || "profile"
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UpdateUser userInfo={user} />;
      case "update-password":
        return <UpdatePassword email={user.email} />;
      case "orders":
        return <Order />;
      case "cancelRequest":
        return <CancelRequest />;
      case "notifications":
        return <Notification />;
      case "productsPurchase":
        return <PurchasedProducts />;
      case "favourites":
        return <Favoutite />;
      case "discounts":
        return <Discount />;
      case "addresses":
        return <Address />;
      case "logout":
        handleLogout();
      default:
        return null;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin");
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công !");
    navigate("/login");
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="user-profile col-md-3 text-center">
          <img
            src={user.image}
            alt="Avatar"
            className="img-fluid rounded-circle border border-2 border-primary"
            style={{ width: "200px", height: "200px" }}
          />

          <ul className="list-group mt-3">
            <li
              className={`list-group-item ${activeSection === "profile" ? "active" : ""
                }`}
              onClick={() => setActiveSection("profile")}
            >
              Thông tin cá nhân
            </li>
            <li
              className={`list-group-item ${activeSection === "update-password" ? "active" : ""
                }`}
              onClick={() => setActiveSection("update-password")}
            >
              Đổi mật khẩu
            </li>
            <li
              className={`list-group-item ${activeSection === "orders" ? "active" : ""
                }`}
              onClick={() => setActiveSection("orders")}
            >
              Đơn hàng
            </li>
            <li
              className={`list-group-item ${activeSection === "cancelRequest" ? "active" : ""
                }`}
              onClick={() => setActiveSection("cancelRequest")}
            >
              Yêu cầu hủy đơn hàng
            </li>
            <li
              className={`list-group-item ${activeSection === "productsPurchase" ? "active" : ""
                }`}
              onClick={() => setActiveSection("productsPurchase")}
            >
              Sản phẩm đã mua
            </li>
            <li
              className={`list-group-item ${activeSection === "notifications" ? "active" : ""
                }`}
              onClick={() => setActiveSection("notifications")}
            >
              Thông báo
            </li>
            <li
              className={`list-group-item ${activeSection === "addresses" ? "active" : ""
                }`}
              onClick={() => setActiveSection("addresses")}
            >
              Sổ địa chỉ
            </li>
            <li
              className={`list-group-item ${activeSection === "favourites" ? "active" : ""
                }`}
              onClick={() => setActiveSection("favourites")}
            >
              Sản phẩm yêu thích
            </li>
            <li
              className={`list-group-item ${activeSection === "discounts" ? "active" : ""
                }`}
              onClick={() => setActiveSection("discounts")}
            >
              Túi mã giảm giá
            </li>
            <li
              className={`list-group-item ${activeSection === "logout" ? "active" : ""
                }`}
              onClick={() => setActiveSection("logout")}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="border p-3 border-success border-2 rounded">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
