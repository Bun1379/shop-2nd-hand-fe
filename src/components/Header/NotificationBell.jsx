import React, { useState } from "react";
import { Dropdown, Spinner, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import NotificationAPI from "../../api/Notification";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await NotificationAPI.GetNotifications();
      setNotifications(response.data.DT);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown align="end" onToggle={(isOpen) => isOpen && fetchNotifications()}>
      <Dropdown.Toggle
        variant="link"
        id="notification-dropdown"
        className="text-dark position-relative"
        style={{ textDecoration: "none" }}
      >
        <FaBell size={24} />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center p-3">
            <Spinner animation="border" size="sm" />
            <span className="ms-2">Đang tải...</span>
          </div>
        ) : notifications.length === 0 ? (
          <Dropdown.Item>Không có thông báo</Dropdown.Item>
        ) : (
          notifications.map((notification, index) => (
            <React.Fragment key={notification._id}>
              <Dropdown.Item
                onClick={() => handleItemClick(notification.order)}
                //   className={notification.read ? "" : "fw-bold"}
              >
                {notification.message}
                <p className="card-text mt-1">
                  {/* {notification.createdAt} */}
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </Dropdown.Item>
              {index < notifications.length - 1 && <Dropdown.Divider />}
            </React.Fragment>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;
