import { useEffect, useState } from "react";
import CancelRequestAPI from "../../../api/CancelRequestAPI";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CancelRequest = () => {
  const [cancelRequest, setCancelRequest] = useState([]);
  const navigate = useNavigate();
  const fetchDataCancelRequest = async () => {
    try {
      const response = await CancelRequestAPI.GetCancelRequests();
      setCancelRequest(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteCancelRequest = async (id) => {
    try {
      await CancelRequestAPI.DeleteCancelRequest(id);
      toast.success("Hủy yêu cầu thành công");
      fetchDataCancelRequest();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDataCancelRequest();
  }, []);

  return (
    <div>
      <h3 className="text-center">Yêu cầu hủy đơn hàng</h3>
      {cancelRequest.length === 0 && <p className="text-center mt-4 text-primary">Hiện tại không có yêu cầu nào</p>}
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
                  onClick={() => navigate(`/order/${request.order._id}`)}
                >
                  Xem chi tiết đơn hàng
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
        ))
      }
    </div >
  );
};

export default CancelRequest;
