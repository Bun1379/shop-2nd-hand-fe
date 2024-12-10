import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import NotificationAPI from "../../../api/Notification";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from "../../../layouts/SocketContext";
import ReactPaginate from "react-paginate"; // Import ReactPaginate

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Lưu trang hiện tại
  const [notificationsPerPage] = useState(5); // Số lượng thông báo mỗi trang

  const navigate = useNavigate();
  const socket = useSocket();

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const fetchNotifications = async () => {
    try {
      const response = await NotificationAPI.GetNotifications();
      setNotifications(response.data.DT); // Lưu tất cả thông báo
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleNotification = (data) => {
      setNotifications((prevNotifications) => {
        if (
          !prevNotifications.some(
            (notification) => notification._id === data._id
          )
        ) {
          return [data, ...prevNotifications];
        }
        return prevNotifications;
      });
    };

    socket.on("notification", handleNotification);
  }, []);

  // Xử lý phân trang
  const indexOfLastNotification = (currentPage + 1) * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // Cập nhật trang khi người dùng chọn trang khác
  };

  return (
    <>
      <h3 className="text-center">Thông báo</h3>
      {notifications.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Không có thông báo nào
        </div>
      )}
      {currentNotifications.length > 0 &&
        currentNotifications.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            handleOnClickOrder={handleOnClickOrder}
          />
        ))}

      {/* Pagination Component */}
      {notifications.length > notificationsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            breakLabel={"..."}
            onPageChange={handlePageClick}
            pageCount={Math.ceil(notifications.length / notificationsPerPage)} // Tổng số trang dựa trên số lượng thông báo
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            pageRangeDisplayed={5}
          />
        </div>
      )}
    </>
  );
};
export default Notification;
