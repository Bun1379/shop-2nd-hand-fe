import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import OrderTable from "./OrderTable";
import ModalViewOrder from "./ModalViewOrder";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});

  const handleViewOrder = (order) => {
    setOrder(order);
    setShowViewOrder(true);
  };

  const UpdateOrderStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const res = await OrderAPI.UpdateOrderStatus(id, data);
      if (res.status === 200) {
        fetchDataOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataOrders = async () => {
    try {
      const res = await OrderAPI.GetOrderByAdmin({ page });
      if (res.status === 200) {
        setOrders(res.data.DT.orders);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataOrders();
  }, [page]);
  return (
    <div className="p-4">
      <h1>Quản lý đơn hàng</h1>
      <OrderTable
        orders={orders}
        setPage={setPage}
        totalPages={totalPages}
        UpdateOrderStatus={UpdateOrderStatus}
        handleViewOrder={handleViewOrder}
      />
      <ModalViewOrder
        show={showViewOrder}
        setShowView={setShowViewOrder}
        order={order}
      />
    </div>
  );
};

export default ManageOrder;
