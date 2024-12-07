import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import CheckoutItem from "../Checkout/CheckoutItem";
import OrderAPI from "../../../api/OrderAPI";
import { Container, Row, Col, Button } from "react-bootstrap";
import ModalCancelRequest from "./ModalCancelRequest";
import CancelRequestAPI from "../../../api/CancelRequestAPI";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSubmitCancelOrder = async (data) => {
    try {
      const { reason } = data;
      await CancelRequestAPI.CreateCancelRequest({ orderId, reason });
      toast.success("Gửi yêu cầu hủy đơn hàng thành công");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    const fetchDataOrder = async () => {
      try {
        const response = await OrderAPI.GetOrderById(orderId);
        setOrder(response.data.DT);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      await OrderAPI.CancelOrder(orderId);
      toast.success("Hủy đơn hàng thành công");
      navigate("/user-profile", { state: { initialSection: "orders" } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderOrderInfo = () => (
    <div className="d-flex flex-column gap-4">
      <p className="fw-bold">Người nhận: {order.name || ""}</p>
      <p className="fw-bold">Địa chỉ nhận hàng: {order.address || ""}</p>
      <p className="fw-bold">Số điện thoại: {order.phone || ""}</p>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="d-flex flex-column gap-4">
      <p className="fw-bold">
        Phương thức thanh toán:{" "}
        {order.paymentMethod === "COD" ? "Tiền mặt" : "Chuyển khoản"}
      </p>
      {order.discountCode && (
        <p className="fw-bold">
          Mã khuyến mãi: {order.discountCode.discountCode} -{" "}
          {order.discountCode.discountPercentage}%
        </p>
      )}
      <p className="fw-bold">Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")} đ</p>
    </div>
  );


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

  return (
    <>
      <Container fluid className="container py-3 shadow bg-light"
        style={{ width: "90%" }}
      >
        <Row className="align-items-center">
          <Col xs="auto">
            <Button
              variant="link"
              className="text-primary d-flex align-items-center gap-2 p-0"
              onClick={() =>
                navigate("/user-profile", {
                  state: { initialSection: "orders" },
                })
              }
            >
              <MdArrowBack /> Trở lại
            </Button>
          </Col>
          <Col className="text-center">
            <p className="mb-1">Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>
            <p className="mb-1 fw-bold">Mã đơn hàng: {order._id}</p>
            <p className={`mb-1 fw-bold ${statusColors[order.status]}`}>
              Trạng thái: {statusLabels[order.status]}
            </p>
          </Col>
          <Col xs="auto"></Col>
        </Row>
      </Container>
      {order.products?.length > 0 && (
        <div className="container my-4">
          {/* Header */}
          <div className="bg-success text-white p-3 rounded">
            <Row className="align-items-center fw-bold">
              <Col xs={2}>Sản phẩm</Col>
              <Col xs={4}></Col>
              <Col xs={2}>Size</Col>
              <Col xs={1} className="text-center">Đơn giá</Col>
              <Col xs={1} className="text-center">Số lượng</Col>
              <Col xs={2} className="text-end">Thành tiền</Col>
            </Row>
          </div>

          {/* Product list */}
          <div className="mt-3">
            {order.products.map((item) => (
              <CheckoutItem key={item.product._id} item={item} />
            ))}
          </div>

          {/* Order Details */}
          <div className="bg-white shadow p-4 mt-4 rounded">
            <div className="d-flex justify-content-between">
              {renderOrderInfo()}
              {renderPaymentInfo()}
            </div>
          </div>
        </div>
      )}
      {/* Cancel Button */}
      {order.status === "PENDING" && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-danger px-5 py-2"
            onClick={handleCancelOrder}
          >
            Hủy đơn hàng
          </button>
        </div>
      )}
      {order.status === "CONFIRMED" && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-danger px-5 py-2"
            onClick={() => setShowModal(true)}
          >
            Gửi yêu cầu hủy đơn hàng
          </button>
        </div>
      )}
      <ModalCancelRequest
        show={showModal}
        setShow={setShowModal}
        handleSubmitCancelOrder={handleSubmitCancelOrder}
      />
    </>
  );
};

export default OrderDetail;
