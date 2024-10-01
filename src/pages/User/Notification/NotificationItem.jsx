const NotificationItem = ({ notification, handleOnClickOrder }) => {
  console.log(notification);
  return (
    <div
      className="bg-white w-75 border border-2 border-success d-flex flex-row mb-2 align-items-center gap-3 p-2"
      style={{ height: "100px", margin: "0 auto" }}
      onClick={() => handleOnClickOrder(notification.order)}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        style={{ width: "50px", height: "50px" }}
        className="ms-2"
      />
      <div className="d-flex flex-column gap-2">
        <p className="mb-0">{notification.message}</p>
        <p className="mb-0">{notification.createdAt}</p>
      </div>
    </div>
  );
};
export default NotificationItem;
