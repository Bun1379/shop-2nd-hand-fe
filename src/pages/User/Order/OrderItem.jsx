import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import OrderProductItem from "./OrderProductItem";
import PaymentAPI from "../../../api/PaymentAPI";
import { toast } from "react-toastify";

const OrderItem = ({ order, handleOnClickOrder, handleReceive }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirm = async () => {
    handleReceive(order._id);
    handleClose();
  };

  const handleCheckOut = async () => {
    const PaymentData = {
      amount: order.totalAmount,
      orderId: order._id,
      returnUrl: "https://ishio-shop.onrender.com/payment/result",
    };
    try {
      const response = await PaymentAPI.postPayment(PaymentData);
      if (response.status === 200) {
        const paymentUrl = response.data.DT;
        window.open(paymentUrl, "_blank");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const statusLabels = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    SHIPPED: "Đang giao",
    DELIVERED: "Đã giao",
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
          <span className="fw-bold">Mã đơn hàng: {order._id}</span>
          <span className="fw-bold">{statusLabels[order.status]}</span>
        </Card.Header>

        <Card.Body
          style={{ cursor: "pointer" }}
          onClick={() => handleOnClickOrder(order._id)}
        >
          {order.status === "PENDING" &&
            order.paymentMethod == "ONLINE" &&
            order.paymentStatus !== "PAID" && (
              <p className="text-danger text-center">
                Đơn hàng chưa thanh toán, vui lòng thanh toán đơn hàng.
              </p>
            )}
          {order.products.map((product) => (
            <OrderProductItem key={product._id} item={product} />
          ))}
          {order.pendingProducts.map((product) => (
            <OrderProductItem key={product._id} item={product} />
          ))}
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end align-items-center bg-light">
          <div className="me-3 d-flex flex-column fw-bold">
            <span className="text-danger">
              {order.shippingFee > 0
                ? `Phí vận chuyển: ${order.shippingFee.toLocaleString(
                    "vi-VN"
                  )} đ`
                : "Miễn phí vận chuyển"}
            </span>
            <span>
              Tổng tiền hàng: {order.totalAmount.toLocaleString("vi-VN")} đ
            </span>
            Tổng cộng:{" "}
            {order.shippingFee > 0
              ? (order.totalAmount + order.shippingFee).toLocaleString("vi-VN")
              : order.totalAmount.toLocaleString("vi-VN")}{" "}
            đ
          </div>
          <span className="fw-bold me-3 d-flex flex-row"></span>

          {order.status === "SHIPPED" && (
            <button className="btn btn-warning" onClick={handleOpen}>
              Đã nhận được hàng
            </button>
          )}

          {order.status === "PENDING" &&
            order.paymentMethod == "ONLINE" &&
            order.paymentStatus !== "PAID" && (
              <button className="btn btn-warning" onClick={handleCheckOut}>
                Thanh toán đơn hàng
              </button>
            )}
        </Card.Footer>
      </Card>

      {/* Modal Xác nhận */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn rằng bạn đã nhận được hàng?</Modal.Body>
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
