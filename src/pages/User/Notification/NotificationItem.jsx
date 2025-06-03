import { Button } from "react-bootstrap";

const NotificationItem = ({ notification, handleOnClickOrder }) => {
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
          <span className={`fw-bold text-uppercase ${colorClass}`}>{label}</span>
          {afterStatus}
        </>
      );
    }
    return message;
  };


  return (
    // <div
    //   className="bg-white w-100 border border-2 border-success d-flex flex-row mb-2 align-items-center gap-3 p-2"
    //   style={{ height: "100px", margin: "0 auto" }}
    //   onClick={() => handleOnClickOrder(notification.order)}
    // >
    //   <div className="d-flex flex-column gap-2">
    //     <p className="mb-0">{notification.message}</p>
    //     <p className="mb-0">{notification.createdAt}</p>
    //   </div>
    // </div>
    <div className="card position-relative my-2 shadow-lg">
      <div className="card-body">
        <h5 className="card-title">{formatMessage(notification.message)}</h5>
        <p className="card-text mt-1">
          {/* {notification.createdAt} */}
          {new Date(notification.createdAt).toLocaleString()}
        </p>
        <Button
          variant="primary"
          onClick={() => handleOnClickOrder(notification.order)}
        >
          Xem đơn hàng
        </Button>
      </div>
    </div>
  );
};
export default NotificationItem;
