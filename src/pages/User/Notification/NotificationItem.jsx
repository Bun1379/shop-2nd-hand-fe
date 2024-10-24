import { Button } from "react-bootstrap";

const NotificationItem = ({ notification, handleOnClickOrder }) => {
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
    <div className="card position-relative my-2">
      <div className="card-body">
        <h5 className="card-title">{notification.message}</h5>
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
