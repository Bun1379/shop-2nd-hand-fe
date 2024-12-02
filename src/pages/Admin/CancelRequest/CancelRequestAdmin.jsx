import { useEffect, useState } from "react";
import CancelRequestAPI from "../../../api/CancelRequestAPI";
import ModalViewOrder from "../Order/ModalViewOrder";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const CancelRequestAdmin = () => {
  const [cancelRequest, setCancelRequest] = useState([]);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});
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

  useEffect(() => {
    fetchDataCancelRequest();
  }, []);
  return (
    <div className="p-4">
      <h1>Yêu cầu hủy đơn hàng</h1>
      <hr />
      {cancelRequest.length === 0 && <p>Hiện tại không có yêu cầu nào</p>}
      {cancelRequest &&
        cancelRequest.length > 0 &&
        cancelRequest.map((request) => (
          <div key={request._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Mã đơn hàng: {request.order._id}</h5>
              <p className="card-title">Lý do hủy: {request.reason}</p>
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => {
                    setOrder(request.order);
                    setShowViewOrder(true);
                  }}
                >
                  Xem chi tiết đơn hàng
                </Button>
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => handleApproveCancelRequest(request._id)}
                >
                  Chấp nhận yêu cầu
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCancelRequest(request._id)}
                >
                  Hủy yêu cầu
                </Button>
              </div>
            </div>
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
