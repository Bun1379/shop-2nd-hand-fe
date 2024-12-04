import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import OrderProductItem from "./OrderProductItem";

const OrderItem = ({ order, handleOnClickOrder, handleReceive }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirm = async () => {
    handleReceive(order._id);
    handleClose();
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
          <span className="fw-bold">Mã đơn hàng: {order._id}</span>
          <span className="fw-bold">{order.status}</span>
        </Card.Header>

        <Card.Body
          style={{ cursor: "pointer" }}
          onClick={() => handleOnClickOrder(order._id)}
        >
          {order.products.map((product) => (
            <OrderProductItem
              key={product._id}
              product={product.product}
              quantity={product.quantity}
            />
          ))}
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end align-items-center bg-light">
          <span className="fw-bold me-3">
            Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")}
          </span>

          {order.status === "SHIPPED" && (
            <button className="btn btn-warning" onClick={handleOpen}>
              Đã nhận được hàng
            </button>
          )}
        </Card.Footer>
      </Card>

      {/* Modal Xác nhận */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn rằng bạn đã nhận được hàng?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderItem;
