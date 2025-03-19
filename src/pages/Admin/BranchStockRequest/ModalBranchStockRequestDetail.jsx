import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ModalAddBranchStock from "../Product/ModalAddBranchStock";
const ModalBranchStockRequestDetail = ({
    Request,
    showDetail,
    setShowDetail,
}) => {
    const [showAddBranchStock, setShowAddBranchStock] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productStatusOptions = [
        { value: "pending", label: "Chờ duyệt" },
        { value: "transferred", label: "Đã chuyển" },
        { value: "not_available", label: "Chưa có hàng" },
    ];

    const handleClose = () => setShowDetail(false);
    const handleApprove = (product) => {
        setSelectedProduct(product);
        setShowAddBranchStock(true);
    };
    return (
        <>
            <Modal show={showDetail} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết yêu cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Request?.products?.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.product.productName}</td>
                                    <td>
                                        {productStatusOptions.find((s) => s.value === product.status)?.label}
                                    </td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => handleApprove(product.product)}
                                        >
                                            Duyệt
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalAddBranchStock
                show={showAddBranchStock}
                setShow={setShowAddBranchStock}
                selectedProduct={selectedProduct}
            />
        </>
    );
};

export default ModalBranchStockRequestDetail;