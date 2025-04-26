import React from "react";
import { Nav, Badge } from "react-bootstrap";

const OrderStatusBar = ({ status, setStatus, totalOrder, selectedBranches }) => {
  const statusList = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "CONFIRMED", label: "Đã xác nhận" },
    { key: "SHIPPED", label: "Đang giao" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "CANCELLED", label: "Đã hủy" },
  ];

  // Nếu có selectedBranches thì lọc theo chi nhánh, nếu không thì giữ nguyên danh sách đơn hàng
  const filteredOrders = (selectedBranches && selectedBranches[0] !== "ALL")
    ? totalOrder.filter(order => selectedBranches.includes(order.branch?._id))
    : totalOrder;

  // Hàm đếm số lượng đơn theo trạng thái
  const getOrderCount = (key) =>
    key === "ALL"
      ? filteredOrders.length
      : filteredOrders.filter((order) => order.status === key).length;

  return (
    <Nav
      variant="pills"
      className="justify-content-center flex-wrap bg-white p-3 rounded shadow-lg border border-1"
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
