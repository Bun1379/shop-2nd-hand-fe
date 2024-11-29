import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import OrderProductItem from "./OrderProductItem";

const OrderItem = ({ order, handleOnClickOrder }) => {
  return (
    <Card
      className="mb-3"
      style={{ cursor: "pointer" }}
      onClick={() => handleOnClickOrder(order._id)}
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
        <span className="fw-bold">Mã đơn hàng: {order._id}</span>
        <span className="fw-bold">{order.status}</span>
      </Card.Header>

      <Card.Body>
        {order.products.map((product) => (
          <OrderProductItem
            key={product._id}
            product={product.product}
            quantity={product.quantity}
          />
        ))}
      </Card.Body>

      <Card.Footer className="d-flex justify-content-end bg-light">
        <span className="fw-bold">
          Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")}
        </span>
      </Card.Footer>
    </Card>
  );
};

export default OrderItem;
