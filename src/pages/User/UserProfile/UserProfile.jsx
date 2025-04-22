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
import LogoutModal from "../../../components/LogoutModal/LogoutModal";
import { useSocket } from "../../../layouts/SocketContext";
import { Card, Image, ListGroup } from "react-bootstrap";
import {
  Person,
  Lock,
  BoxSeam,
  XCircle,
  Cart,
  Bell,
  GeoAlt,
  Heart,
  Tag,
  BoxArrowRight,
} from "react-bootstrap-icons";

const UserAccount = ({ initialSection }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const { user } = useSocket();
  const [activeSection, setActiveSection] = useState(
    location.state?.initialSection || "profile"
  );
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row align-items-start">
        <Card className="shadow-sm border-0 text-center p-3 mb-4 user-profile col-md-3">
          <Image
            src={user.image}
            roundedCircle
            className="border border-3 border-primary mx-auto"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <ListGroup variant="flush" className="mt-4">
            <ListGroup.Item
              action
              active={activeSection === "profile"}
              onClick={() => setActiveSection("profile")}
            >
              <Person className="me-2" />
              Thông tin cá nhân
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "update-password"}
              onClick={() => setActiveSection("update-password")}
            >
              <Lock className="me-2" />
              Đổi mật khẩu
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "orders"}
              onClick={() => setActiveSection("orders")}
            >
              <BoxSeam className="me-2" />
              Đơn hàng
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "cancelRequest"}
              onClick={() => setActiveSection("cancelRequest")}
            >
              <XCircle className="me-2" />
              Yêu cầu hủy đơn hàng
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "productsPurchase"}
              onClick={() => setActiveSection("productsPurchase")}
            >
              <Cart className="me-2" />
              Sản phẩm đã mua
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "notifications"}
              onClick={() => setActiveSection("notifications")}
            >
              <Bell className="me-2" />
              Thông báo
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "addresses"}
              onClick={() => setActiveSection("addresses")}
            >
              <GeoAlt className="me-2" />
              Sổ địa chỉ
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "favourites"}
              onClick={() => setActiveSection("favourites")}
            >
              <Heart className="me-2" />
              Sản phẩm yêu thích
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={activeSection === "discounts"}
              onClick={() => setActiveSection("discounts")}
            >
              <Tag className="me-2" />
              Túi mã giảm giá
            </ListGroup.Item>
            <ListGroup.Item
              action
              variant="danger"
              onClick={() => handleShow()}
            >
              <BoxArrowRight className="me-2" />
              Đăng xuất
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <div className="col-md-9">
          <Card className="border-0 shadow-sm p-3">{renderContent()}</Card>
        </div>
      </div>
      <LogoutModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default UserAccount;
