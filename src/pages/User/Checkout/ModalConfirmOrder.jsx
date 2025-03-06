import CheckoutItem from "./CheckoutItem";
import { Button, Modal } from "react-bootstrap";

const ModalConfirmOrder = ({ isOpen, onRequestClose, productOutOfStock, handleOrder }) => {
    return (
        <Modal show={isOpen} onHide={onRequestClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Thông Báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Một số sản phẩm đã hết hàng ở chi nhánh này</h4>
                {productOutOfStock?.map((item) => (
                    <CheckoutItem key={item.product._id} item={item} />
                ))}
                <p>Thời gian đặt hàng sẽ lâu hơn bình thường. Bạn có chắc muốn đặt hàng ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Đóng</Button>
                <Button variant="primary" onClick={handleOrder}>Đặt Hàng</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalConfirmOrder