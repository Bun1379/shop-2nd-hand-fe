import CheckoutItem from "./CheckoutItem";
import { Button, Modal, Row, Col } from "react-bootstrap";

const ModalConfirmOrder = ({ isOpen, onRequestClose, productOutOfStock, handleOrder }) => {
    return (
        <Modal show={isOpen} onHide={onRequestClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Thông Báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Một số sản phẩm đã hết hàng ở chi nhánh này</h4>
                <div
                    className="bg-success text-white p-2 rounded w-100 align-items-center mb-3"
                    style={{ margin: "auto" }}
                >
                    <Row className="align-items-center fw-bold">
                        <Col xs={2}>Sản phẩm</Col>
                        <Col xs={4}></Col>
                        <Col xs={1}>Size</Col>
                        <Col xs={2} className="text-center">
                            Đơn giá
                        </Col>
                        <Col xs={1} className="text-center">
                            Số lượng
                        </Col>
                        <Col xs={2} className="text-end">
                            Thành tiền
                        </Col>
                    </Row>
                </div>
                <div className="w-100" style={{ margin: "0 auto" }}>
                    {productOutOfStock.map((item) => (
                        <CheckoutItem key={item.product._id} item={item} />
                    ))}
                </div>

                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "#fdecea", // Màu nền đỏ nhạt
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng đổ
                        border: "1px solid #f5c6cb", // Viền nhẹ màu đỏ
                        maxWidth: "100%", // Giới hạn chiều rộng
                        margin: "10px auto", // Căn giữa ngang
                    }}
                >
                    <p className="text-danger text-center m-0">
                        Thời gian đặt hàng sẽ lâu hơn bình thường. Bạn có chắc muốn đặt hàng ?
                    </p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Đóng</Button>
                <Button variant="primary" onClick={handleOrder}>Đặt Hàng</Button>
            </Modal.Footer>
        </Modal >
    );
}
export default ModalConfirmOrder