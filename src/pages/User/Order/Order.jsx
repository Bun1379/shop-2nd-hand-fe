import { useEffect, useState } from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderItem from "./OrderItem";
import OrderAPI from "../../../api/OrderAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const [status, setStatus] = useState("ALL");
  const [listOrder, setListOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const navigate = useNavigate();

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders();
      const listOrder = response.data.DT;
      listOrder.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTotalOrder(listOrder);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const filterOrder = () => {
    if (status === "ALL") {
      setListOrder(totalOrder);
    } else setListOrder(totalOrder.filter((order) => order.status === status));
  };

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleReceive = async (orderId) => {
    try {
      const data = {
        status: "DELIVERED",
      };
      const res = await OrderAPI.UpdateOrderStatus(orderId, data);
      if (res.status === 200) {
        toast.success("Nhận hàng thành công");
        fetchDataOrder();
      }
    } catch (error) {
      toast.error("Lỗi: " + error.message);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  useEffect(() => {
    if (totalOrder.length > 0) {
      filterOrder();
    }
  }, [status, totalOrder]);

  return (
    <div>
      <h3 className="text-center">Đơn hàng của bạn</h3>
      <OrderStatusBar
        status={status}
        setStatus={setStatus}
        totalOrder={totalOrder}
      />
      {listOrder.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Không có đơn hàng nào
        </div>
      )}
      {listOrder.length > 0 &&
        listOrder.map((order, index) => (
          <OrderItem
            key={index}
            order={order}
            handleOnClickOrder={handleOnClickOrder}
            handleReceive={handleReceive}
          />
        ))}
    </div>
  );
};
export default Order;
