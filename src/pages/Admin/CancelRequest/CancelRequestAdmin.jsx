import { useEffect, useState } from "react";
import CancelRequestAPI from "../../../api/CancelRequestAPI";
import ModalViewOrder from "../Order/ModalViewOrder";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import BranchAPI from "../../../api/BranchAPI";
import Select from "react-select";

const CancelRequestAdmin = () => {
  const [cancelRequest, setCancelRequest] = useState([]);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [filteredRequest, setFilteredRequest] = useState([]);

  const fetchDataCancelRequest = async () => {
    try {
      const res = await CancelRequestAPI.GetCancelRequestsAdmin();
      setCancelRequest(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCancelRequest = async (id) => {
    try {
      await CancelRequestAPI.DeleteCancelRequest(id);
      toast.success("Đã hủy yêu cầu");
      fetchDataCancelRequest();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleApproveCancelRequest = async (id) => {
    try {
      await CancelRequestAPI.ApproveCancelRequest(id);
      toast.success("Đã hủy đơn hàng");
      fetchDataCancelRequest();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const filterRequest = () => {
    let filtered = cancelRequest;

    if (!selectedBranches.includes("ALL")) {
      filtered = filtered.filter((item) =>
        selectedBranches.includes(item?.order?.branch?._id)
      );
    }

    setFilteredRequest(filtered);
  };

  useEffect(() => {
    if (user.role === "ADMIN") {
      BranchAPI.getAllBranches().then((res) => {
        if (res.status === 200) {
          const allBranches = res.data.DT.map((branch) => ({
            value: branch._id,
            label: branch.name,
          }));
          setBranches([
            { value: "ALL", label: "Tất cả chi nhánh" },
            ...allBranches,
          ]);
          setSelectedBranches(["ALL"]);
        }
      });
    } else if (Array.isArray(user.branch) && user.branch.length > 0) {
      const userBranches = user.branch.map((branch) => ({
        value: branch._id,
        label: branch.name,
      }));
      setBranches(userBranches);
      setSelectedBranches(userBranches[0].value);
    }
  }, []);

  useEffect(() => {
    filterRequest();
  }, [selectedBranches, cancelRequest]);

  useEffect(() => {
    fetchDataCancelRequest();
  }, []);

  return (
    <div className="p-4">
      <h1>Yêu cầu hủy đơn hàng</h1>
      <Select
        options={branches}
        isMulti
        value={branches.filter((b) => selectedBranches.includes(b.value))}
        onChange={(selectedOptions) =>
          setSelectedBranches(selectedOptions.map((option) => option.value))
        }
      />
      <hr />
      {filteredRequest.length === 0 && <p>Hiện tại không có yêu cầu nào</p>}
      {filteredRequest &&
        filteredRequest.length > 0 &&
        filteredRequest.map((request) => (
          <div key={request._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Mã đơn hàng: {request.order._id}</h5>
              <p className="card-title">Lý do hủy: {request.reason}</p>
              <div className="d-flex justify-content-end">
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => {
                    setOrder(request.order);
                    setShowViewOrder(true);
                  }}
                >
                  Xem chi tiết đơn hàng
                </Button>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => setShowModalConfirm(true)}
                >
                  Chấp nhận yêu cầu
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowModalDelete(true)}
                >
                  Hủy yêu cầu
                </Button>
              </div>
            </div>
            <ConfirmModal
              show={showModalDelete}
              onClose={() => setShowModalDelete(false)}
              text="Bạn có muốn hủy yêu cầu này không ?"
              onConfirm={() => handleDeleteCancelRequest(request._id)}
            />
            <ConfirmModal
              show={showModalConfirm}
              onClose={() => setShowModalConfirm(false)}
              text="Bạn có muốn chấp nhận yêu cầu này không ?"
              onConfirm={() => handleApproveCancelRequest(request._id)}
            />
          </div>
        ))}
      <ModalViewOrder
        show={showViewOrder}
        setShowView={setShowViewOrder}
        order={order}
      />
    </div>
  );
};

export default CancelRequestAdmin;
