import React from "react";
import { Nav, Badge } from "react-bootstrap";

const OrderStatusBar = ({ status, setStatus, totalOrder }) => {
  const statusList = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "CONFIRMED", label: "Đã xác nhận" },
    { key: "SHIPPED", label: "Đang giao" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "CANCELLED", label: "Đã hủy" },
  ];

  const getOrderCount = (key) =>
    key === "ALL"
      ? totalOrder.length
      : totalOrder.filter((order) => order.status === key).length;

  return (
    <Nav
      variant="pills"
      className="justify-content-center flex-wrap bg-white p-3 rounded shadow-sm"
    >
      {statusList.map((item) => (
        <Nav.Item key={item.key} className="mx-1">
          <Nav.Link
            active={status === item.key}
            onClick={() => setStatus(item.key)}
            className={`d-flex align-items-center px-3 py-2 ${status === item.key ? "text-white bg-success" : "text-dark"
              }`}
            style={{
              borderRadius: "50px",
              transition: "all 0.3s ease",
              fontWeight: "bold",
            }}
          >
            {item.label}
            <Badge
              bg={status === item.key ? "light" : "primary"}
              className="ms-2"
              pill
              text={status === item.key ? "dark" : "light"}
            >
              {getOrderCount(item.key)}
            </Badge>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default OrderStatusBar;
