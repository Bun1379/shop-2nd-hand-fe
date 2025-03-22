import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ModalAddBranchStock from "../Product/ModalAddBranchStock";
import BranchStockRequestAPI from "../../../api/BranchStockRequestAPI";

const ModalBranchStockRequestDetail = ({
    Request,
    showDetail,
    setShowDetail,
    fetchRequests,
}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [showAddBranchStock, setShowAddBranchStock] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [requestDetail, setRequestDetail] = useState(Request);

    const productStatusOptions = [
        { value: "pending", label: "Chờ duyệt" },
        { value: "transferred", label: "Đã chuyển" },
    ];

    const handleClose = () => setShowDetail(false);
    const handleApprove = (product) => {
        setSelectedProduct(product);
        setShowAddBranchStock(true);
    };
    const handleApproveProduct = async () => {
        try {
            const res = await BranchStockRequestAPI.updateBranchStockRequestProductStatus({
                requestId: requestDetail._id,
                productId: selectedProduct._id,
                status: "transferred",
            });
            if (res.status === 200) {
                fetchRequests();
                setRequestDetail((prev) => ({
                    ...prev,
                    products: prev.products.map((p) =>
                        p.product._id === selectedProduct._id ? { ...p, status: "transferred" } : p
                    ),
                }));
            }
        } catch (err) {
            console.log(err.response?.data?.EM);
        }
    };

    useEffect(() => {
        setRequestDetail(Request);
    }, [Request]);


    return (
        <>
            <Modal show={showDetail} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Chi tiết yêu cầu của{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                            {requestDetail?.branch.name}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Trạng thái</th>
                                {requestDetail?.status === "confirmed" && user.is_admin &&
                                    <th>Hành động</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {requestDetail?.products?.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={product.product.images[0]}
                                            alt={product.product.productName}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    </td>
                                    <td>{product.product.productName}</td>
                                    <td>
                                        {productStatusOptions.find((s) => s.value === product.status)?.label}
                                    </td>
                                    {requestDetail?.status === "confirmed" && user.is_admin &&
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => handleApprove(product.product)}
                                            >
                                                Duyệt
                                            </Button>
                                        </td>
                                    }
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
                fetchDataProduct={handleApproveProduct}
            />
        </>
    );
};

export default ModalBranchStockRequestDetail;