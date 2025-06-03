import { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import BranchStockRequestAPI from "../../../api/BranchStockRequestAPI";
import BranchAPI from "../../../api/BranchAPI";
import { toast } from "react-toastify";
import ModalBranchStockRequestDetail from "./ModalBranchStockRequestDetail";

const ManageBranchStockRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedProductStatus, setSelectedProductStatus] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const statusOptions = [
    { value: "pending", label: "Chờ duyệt" },
    { value: "confirmed", label: "Đang xử lý" },
    { value: "approved", label: "Hoàn thành" },
  ];

  const productStatusOptions = [
    { value: "pending", label: "Chờ duyệt" },
    { value: "transferred", label: "Đã chuyển" },
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
      const res = await BranchStockRequestAPI.getBranchStockRequest({
        branch: selectedBranch?.value,
        status: selectedStatus?.value,
        productStatus: selectedProductStatus?.value,
      });
      if (res.status === 200) {
        // console.log(res.data.DT);
        setRequests(res.data.DT);
        setCurrentPage(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [selectedBranch, selectedStatus, selectedProductStatus]);

  const handleShowDetail = async (req) => {
    setSelectedRequest(req);
    setShowDetail(true);
    fetchRequests();
  };

  const handleChangeRequestStatus = async (id, status) => {
    try {
      const res = await BranchStockRequestAPI.updateBranchStockRequestStatus({
        requestId: id,
        status: status,
      });
      if (res.status === 200) {
        toast.success("Thay đổi trạng thái thành công");
        fetchRequests();
      }
    } catch (err) {
      console.log(err);
      toast.error("Thay đổi trạng thái thất bại");
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const res = await BranchStockRequestAPI.deleteBranchStockRequest(id);
      if (res.status === 200) {
        toast.success("Xóa yêu cầu thành công");
        fetchRequests();
      }
    } catch (err) {
      toast.error(err?.data?.EM);
      console.log(err);
    }
  };

  const handleResetButton = () => {
    setSelectedBranch(null);
    setSelectedStatus(null);
    setSelectedProductStatus(null);
  };

  // Tính toán danh sách yêu cầu hiển thị
  const offset = currentPage * itemsPerPage;
  const currentRequests = requests.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="p-4">
      <h1>Danh sách yêu cầu nhập hàng</h1>
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
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-primary" onClick={handleResetButton}>
                Làm mới
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên chi nhánh</th>
            <th>Người yêu cầu</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((req) => (
            <tr key={req._id}>
              <td>{req.branch.name}</td>
              <td>{req.createdBy.username}</td>
              <td>
                {`${new Date(req.createdAt).toLocaleDateString(
                  "vi-VN"
                )} ${new Date(req.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </td>
              <td>
                {user.role === "ADMIN" ? (
                  <Select
                    options={statusOptions.slice(0, 2)}
                    value={statusOptions.find(
                      (status) => status.value === req.status
                    )}
                    onChange={(selected) =>
                      handleChangeRequestStatus(req._id, selected.value)
                    }
                    isDisabled={req.status === "approved"}
                  />
                ) : (
                  statusOptions.find((status) => status.value === req.status)
                    ?.label
                )}
              </td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleShowDetail(req)}
                >
                  Xem chi tiết
                </button>
                {req.status == "pending" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRequest(req._id)}
                  >
                    Xóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      )}

      <ModalBranchStockRequestDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        Request={selectedRequest}
        fetchRequests={fetchRequests}
      />
    </div>
  );
};

export default ManageBranchStockRequest;
