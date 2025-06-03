import { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import CheckoutItem from "../../User/Checkout/CheckoutItem";

const ModalViewOrder = ({ show, setShowView, order }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discountCode, setDiscountCode] = useState({});
  const [branch, setBranch] = useState("");

  const handleClose = () => setShowView(false);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setPhone(order.phone);
      setAddress(order.address);
      setProducts(order.products);
      setPendingProducts(order.pendingProducts);
      setTotalAmount(order.totalAmount || 0);
      setShippingFee(order.shippingFee || 0);
      setFinalTotal((order.totalAmount || 0) + (order.shippingFee || 0));
      setPaymentMethod(order.paymentMethod);
      setDiscountCode(order.discountCode);
      setBranch(order.branch);
    }
  }, [order]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          {/* Thông tin người nhận */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Tên người nhận</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Số điện thoại</label>
            <input type="text" className="form-control" value={phone} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Địa chỉ</label>
            <textarea className="form-control" value={address} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Chi nhánh đặt hàng</label>
            <textarea type="text" className="form-control" value={`${branch?.name} - ${branch?.address}`} disabled />
          </div>
          {/* Danh sách sản phẩm */}
          <div className="col-md-12">
            {/* Danh sách sản phẩm đã xác nhận */}
            {products?.length > 0 && (
              <>
                <div className="bg-success text-white p-3 rounded mb-3 shadow">
                  <Row className="align-items-center">
                    <Col xs={2}>Sản phẩm</Col>
                    <Col xs={4}></Col>
                    <Col xs={1}>Size</Col>
                    <Col xs={2} className="text-center">Đơn giá</Col>
                    <Col xs={1} className="text-center">Số lượng</Col>
                    <Col xs={2} className="text-end">Thành tiền</Col>
                  </Row>
                </div>
                {products.map((product) => (
                  <CheckoutItem item={product} key={product._id} />
                ))}
              </>
            )}

            {/* Danh sách sản phẩm hết hàng */}
            {pendingProducts?.length > 0 && (
              <>
                <div className="bg-warning text-dark p-3 rounded mb-3 shadow mt-4">
                  <Row className="align-items-center">
                    <Col xs={2}>Sản phẩm (Hết hàng)</Col>
                    <Col xs={4}></Col>
                    <Col xs={1}>Size</Col>
                    <Col xs={2} className="text-center">Đơn giá</Col>
                    <Col xs={1} className="text-center">Số lượng</Col>
                    <Col xs={2} className="text-end">Thành tiền</Col>
                  </Row>
                </div>
                {pendingProducts.map((product) => (
                  <CheckoutItem item={product} key={product._id} />
                ))}
              </>
            )}
          </div>


          {/* Thông tin thanh toán */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Mã giảm giá</label>
            <input type="text" className="form-control" value={discountCode?.discountCode || "Không có"} disabled />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Mã giảm giá vận chuyển</label>
            <input type="text" className="form-control" value={discountCode?.discountCode || "Không có"} disabled />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Phương thức thanh toán</label>
            <input type="text" className="form-control" value={paymentMethod} disabled />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Phí vận chuyển</label>
            <input type="text" className="form-control" value={`${shippingFee.toLocaleString("vi-VN")} đ`} disabled />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Tổng tiền hàng</label>
            <input type="text" className="form-control" value={`${totalAmount.toLocaleString("vi-VN")} đ`} disabled />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold text-danger">Tổng cộng</label>
            <input type="text" className="form-control" value={`${finalTotal.toLocaleString("vi-VN")} đ`} disabled />
          </div>

        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewOrder;
