import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
import BranchStockRequestAPI from "../../../api/BranchStockRequestAPI";
import BranchAPI from "../../../api/BranchAPI";

const ManageBranchStockRequest = () => {
    const [requests, setRequests] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedProductStatus, setSelectedProductStatus] = useState(null);

    const statusOptions = [
        { value: "pending", label: "Chờ duyệt" },
        { value: "approved", label: "Đã duyệt" },
        { value: "rejected", label: "Từ chối" },
    ];

    const productStatusOptions = [
        { value: "pending", label: "Chờ duyệt" },
        { value: "transferred", label: "Đã chuyển" },
        { value: "not_available", label: "Chưa có hàng" },
    ];

    useEffect(() => {
        BranchAPI.getAllBranches().then((res) => {
            if (res.status === 200) {
                const branchOptions = res.data.DT.map((branch) => ({
                    value: branch._id,
                    label: branch.name,
                }));
                setBranches([{ value: 0, label: "Tất cả" }, ...branchOptions]);
            }
        });
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await RequestStockAPI.getRequests({
                branch: selectedBranch?.value,
                status: selectedStatus?.value,
            });
            if (res.status === 200) {
                setRequests(res.data.DT);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedBranch, selectedStatus, selectedProductStatus]);

    const handleApprove = async (id) => {
        await RequestStockAPI.updateRequestStatus(id, "approved");
        fetchRequests();
    };

    const handleReject = async (id) => {
        await RequestStockAPI.updateRequestStatus(id, "rejected");
        fetchRequests();
    };

    return (
        <div className="p-4">
            <h1>Danh sách yêu cầu nhập kho</h1>
            <Accordion className="my-2">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Lọc tìm kiếm</Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex flex-row gap-3 my-2">
                            <Select
                                options={branches}
                                className="w-50"
                                value={selectedBranch}
                                onChange={setSelectedBranch}
                                placeholder="Chọn chi nhánh"
                            />
                            <Select
                                options={statusOptions}
                                className="w-50"
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                placeholder="Trạng thái"
                            />
                            <Select
                                options={productStatusOptions}
                                className="w-50"
                                value={selectedProductStatus}
                                onChange={setSelectedProductStatus}
                                placeholder="Trạng thái sản phẩm"
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Chi nhánh</th>
                        <th>Người yêu cầu</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.branch.name}</td>
                            <td>{req.product.name}</td>
                            <td>{req.quantity}</td>
                            <td>
                                <span
                                    className={`badge ${req.status === "pending"
                                        ? "bg-warning"
                                        : req.status === "approved"
                                            ? "bg-success"
                                            : "bg-danger"
                                        }`}
                                >
                                    {statusOptions.find((s) => s.value === req.status)?.label}
                                </span>
                            </td>
                            <td>
                                {req.status === "pending" && (
                                    <>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleApprove(req._id)}
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleReject(req._id)}
                                        >
                                            Từ chối
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBranchStockRequest;
