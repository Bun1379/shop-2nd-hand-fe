import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import CheckoutItem from "../Checkout/CheckoutItem";
import OrderAPI from "../../../api/OrderAPI";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ModalCancelRequest from "./ModalCancelRequest";
import CancelRequestAPI from "../../../api/CancelRequestAPI";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    const fetchDataOrder = async () => {
      try {
        const response = await OrderAPI.GetOrderById(orderId);
        setOrder(response.data.DT);
        console.log(response.data.DT);
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

  const handleSubmitCancelOrder = async (data) => {
    try {
      await CancelRequestAPI.CreateCancelRequest({ orderId, reason: data.reason });
      toast.success("Gửi yêu cầu hủy đơn hàng thành công");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
      console.error("Error:", error);
    }
  };

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
    <Container className="py-4">
      {/* Header */}
      <Card className="shadow-sm p-3">
        <Row className="align-items-center">
          <Col xs="auto">
            <Button variant="link" className="text-primary d-flex align-items-center gap-2 p-0" onClick={() => navigate("/user-profile", { state: { initialSection: "orders" } })}>
              <MdArrowBack /> Trở lại
            </Button>
          </Col>
          <Col className="text-center">
            <p className="mb-1">Ngày tạo: {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : ""}</p>
            <p className="mb-1 fw-bold">Mã đơn hàng: {order._id}</p>
            <p className="mb-1">Được giao từ: {order.branch?.address}</p>
            <p className={`mb-1 fw-bold ${statusColors[order.status]}`}>
              Trạng thái: {statusLabels[order.status]}
            </p>
          </Col>
        </Row>
      </Card>


      {/* Sản phẩm trong đơn hàng */}
      <div>
        {/* Header */}
        <div className="bg-success text-white p-3 rounded mt-4 mb-3">
          <Row className="align-items-center fw-bold">
            <Col xs={1}>Sản phẩm</Col>
            <Col xs={5}></Col>
            <Col xs={1}>Size</Col>
            <Col xs={2} className="text-center">Đơn giá</Col>
            <Col xs={1} className="text-center">Số lượng</Col>
            <Col xs={2} className="text-end">Thành tiền</Col>
          </Row>
        </div>

        {order.products?.map((item) => (
          <CheckoutItem key={item.product._id} item={item} />
        ))}

        {order.pendingProducts?.map((item) => (
          <CheckoutItem key={item.product._id} item={item} />
        ))}
      </div>


      {/* Thông tin đơn hàng */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5 className="fw-bold">Thông tin người nhận</h5>
            <hr />
            <p className="mb-2"><strong>Người nhận:</strong> {order.name || ""}</p>
            <p className="mb-2"><strong>Địa chỉ:</strong> {order.address || ""}</p>
            <p className="mb-2"><strong>Số điện thoại:</strong> {order.phone || ""}</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5 className="fw-bold">Thông tin thanh toán</h5>
            <hr />
            <p className="mb-2"><strong>Phương thức thanh toán:</strong> {order.paymentMethod === "COD" ? "Tiền mặt" : "Chuyển khoản"}</p>
            {order.discountCode && order.discountCode.discountCode && (
              <p className="mb-2"><strong>Mã khuyến mãi:</strong> {order.discountCode.discountCode} - {order.discountCode.discountPercentage}%</p>
            )}
            <p className="mb-2"><strong>Tổng tiền hàng:</strong> {order.totalAmount?.toLocaleString("vi-VN")} đ</p>
            <p className="mb-2">
              <strong>Phí vận chuyển:</strong> {order.shippingFee > 0 ? `${order.shippingFee.toLocaleString("vi-VN")} đ` : "Miễn phí"}
            </p>
            <p className="fw-bold text-danger fs-5">
              Tổng tiền: {((order.totalAmount ?? 0) + (order.shippingFee ?? 0)).toLocaleString("vi-VN")} đ
            </p>
          </Card>
        </Col>
      </Row>

      {/* Nút Hủy đơn */}
      <div className="text-center mt-4">
        {order.status === "PENDING" && (
          <Button variant="danger" size="lg" onClick={handleCancelOrder}>Hủy đơn hàng</Button>
        )}
        {order.status === "CONFIRMED" && (
          <Button variant="warning" size="lg" onClick={() => setShowModal(true)}>Gửi yêu cầu hủy</Button>
        )}
      </div>

      {/* Modal hủy đơn */}
      <ModalCancelRequest show={showModal} setShow={setShowModal} handleSubmitCancelOrder={handleSubmitCancelOrder} />
    </Container>
  );
};

export default OrderDetail;
