import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";
import UpdateUser from "./UpdateUser";
import Order from "../Order/Order";
import Notification from "../Notification/Notification";
import PurchasedProducts from "../Review/PurchasedProducts";
import Favoutite from "../Favourite/Favourite";

const UserAccount = ({ initialSection }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeSection, setActiveSection] = useState(
    location.state?.initialSection || initialSection || "profile"
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UpdateUser />;
      case "orders":
        return <Order />;
      case "notifications":
        return <Notification />;
      case "productsPurchase":
        return <PurchasedProducts />;
      case "favourites":
        return <Favoutite />;
      case "logout":
        return (
          <div>
            <h4>Đăng xuất</h4>
            <p>Bạn đã đăng xuất.</p>
          </div>
        );
      default:
        return null;
    }
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
              className={`list-group-item ${
                activeSection === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveSection("profile")}
            >
              Thông tin cá nhân
            </li>
            <li
              className={`list-group-item ${
                activeSection === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveSection("orders")}
            >
              Đơn mua
            </li>
            <li
              className={`list-group-item ${
                activeSection === "productsPurchase" ? "active" : ""
              }`}
              onClick={() => setActiveSection("productsPurchase")}
            >
              Sản phẩm đã mua
            </li>
            <li
              className={`list-group-item ${
                activeSection === "notifications" ? "active" : ""
              }`}
              onClick={() => setActiveSection("notifications")}
            >
              Thông báo
            </li>
            <li
              className={`list-group-item ${
                activeSection === "favourites" ? "active" : ""
              }`}
              onClick={() => setActiveSection("favourites")}
            >
              Sản phẩm yêu thích
            </li>
            <li
              className={`list-group-item ${
                activeSection === "logout" ? "active" : ""
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
