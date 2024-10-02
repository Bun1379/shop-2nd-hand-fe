import { useState } from "react";

const OrderStatusBar = ({ status, setStatus, totalOrder }) => {
  const statusList = [
    "ALL",
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  return (
    <div className="d-flex justify-content-center flex-column">
      <h3 className="text-center">Order Status</h3>
      <div
        className="bg-white w-100 align-items-center justify-content-between d-flex flex-row"
        style={{ height: "75px", margin: "0 auto" }}
      >
        {statusList.map((item, index) => (
          <div
            key={index}
            className={`d-flex justify-content-center align-items-center border-bottom border-2 p-2 flex-row ${
              status === item ? "border-success" : ""
            }`}
            style={{ width: "20%" }}
            onClick={() => setStatus(item)}
          >
            {item}{" "}
            <p className="mb-0">
              (
              {item === "ALL"
                ? totalOrder.length
                : totalOrder.filter((order) => order.status === item).length}
              )
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderStatusBar;
