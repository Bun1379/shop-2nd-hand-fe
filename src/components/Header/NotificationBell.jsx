import React, { useEffect, useState } from "react";
import { Dropdown, Spinner, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import NotificationAPI from "../../api/Notification";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
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

  const markAsRead = async (notificationId) => {
    try {
      await NotificationAPI.ReadNotificatin(notificationId); // Giả sử API có hàm này
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đánh dấu đã đọc thông báo");
      console.error("Error marking notification as read: ", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);

  const statusLabels = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    SHIPPED: "Đang giao",
    DELIVERED: "Đã giao",
  };

  const statusColors = {
    PENDING: "text-warning",
    CONFIRMED: "text-success",
    CANCELLED: "text-danger",
    SHIPPED: "text-info",
    DELIVERED: "text-dark",
  };

  const formatMessage = (message) => {
    const statusMatch = message.match(/trạng thái thành (\w+)/);
    if (statusMatch) {
      const status = statusMatch[1];
      const label = statusLabels[status] || "Không xác định";
      const colorClass = statusColors[status] || "text-muted";

      // Tách phần trước và sau trạng thái
      const [beforeStatus, afterStatus] = message.split(statusMatch[0]);

      return (
        <>
          {beforeStatus}
          <span className={`text-uppercase ${colorClass}`}>{label}</span>
          {afterStatus}
        </>
      );
    }
    return message;
  };

  return (
    <Dropdown align="end" onToggle={(isOpen) => isOpen && fetchNotifications()}>
      <Dropdown.Toggle
        variant="link"
        id="notification-dropdown"
        className="position-relative header-dropdown-toggle mt-2"
        style={{ textDecoration: "none", color: "rgba(255, 255, 255, 0.55)" }}
      >
        <FaBell size={24} />
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute top-0 start-60 translate-middle"
            style={{ fontSize: "0.75rem" }}
          >
            {unreadCount}
          </Badge>
        )}
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
                className={notification.isRead ? "" : "fw-bold"}
              >
                {formatMessage(notification.message)}
                <p className="card-text mt-1">
                  {/* {notification.createdAt} */}
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
                {!notification.isRead && (
                  <button
                    className="btn btn-sm btn-outline-primary mt-2"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification._id);
                    }}
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
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
