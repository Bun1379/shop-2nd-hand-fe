import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import NotificationAPI from "../../../api/Notification";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from "../../../layouts/SocketContext";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const socket = useSocket();

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const fetchNotifications = async () => {
    try {
      const response = await NotificationAPI.GetNotifications();
      setNotifications(response.data.DT);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });
  }, []);
  return (
    <>
      <h3 className="text-center">Thông báo</h3>
      {notifications.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Không có thông báo nào
        </div>
      )}
      {notifications.length > 0 &&
        notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            handleOnClickOrder={handleOnClickOrder}
          />
        ))}
    </>
  );
};
export default Notification;
