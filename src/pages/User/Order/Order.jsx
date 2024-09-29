import { useEffect, useState } from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderItem from "./OrderItem";
import OrderAPI from "../../../api/OrderAPI";

const Order = () => {
  const [status, setStatus] = useState("PENDING");
  const [listOrder, setListOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders();
      const listOrder = response.data.DT;
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
      <OrderStatusBar status={status} setStatus={setStatus} />
      {listOrder.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Không có đơn hàng nào
        </div>
      )}
      {listOrder.length > 0 &&
        listOrder.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
    </div>
  );
};
export default Order;
