import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalRequestStock = ({
    requestList,
    setRequestList,
    showModalRequest,
    setShowModalRequest }) => {
    const handleClose = () => {
        setShowModalRequest(false);
    };

    const removeFromRequest = (id) => {
        setRequestList(requestList.filter((item) => item._id !== id));
        toast.success("Sản phẩm đã được xóa khỏi danh sách nhập hàng");
    };

    const submitRequest = () => {

    };

    return (
        <Modal show={showModalRequest} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Yêu cầu nhập hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestList.length === 0 ? (
                            <tr>
                                <td colSpan="2">Không có sản phẩm nào</td>
                            </tr>
                        ) : (
                            requestList.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => removeFromRequest(item._id)}>
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={submitRequest}>
                    Gửi yêu cầu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRequestStock;
