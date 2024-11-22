import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import OrderTable from "./OrderTable";
import ModalViewOrder from "./ModalViewOrder";
import { toast } from "react-toastify";
import { Accordion } from "react-bootstrap";
import Select from "react-select";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(null);

  const optionsStatus = [
    {
      value: "PENDING",
      label: "Đang xử lý",
    },
    {
      value: "CONFIRMED",
      label: "Đã xác nhận",
    },
    {
      value: "SHIPPED",
      label: "Đang giao",
    },
    {
      value: "DELIVERED",
      label: "Đã giao",
    },
    {
      value: "CANCELLED",
      label: "Đã hủy",
    },
  ];

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
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        fetchDataOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateOrderPaymentStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const res = await OrderAPI.UpdateOrderPaymnentStatus(id, data);
      if (res.status === 200) {
        toast.success("Cập nhật trạng thái thanh toán thành công");
        fetchDataOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataOrders = async () => {
    try {
      const res = await OrderAPI.GetOrderByAdmin({
        page,
        status: selectedStatus?.value,
      });
      if (res.status === 200) {
        setOrders(res.data.DT.orders);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSearch = () => {
    // if (selectedStatus && page !== 1) {
    //   setPage(1);
    // } else {
    //   setPage(1);
    //   fetchDataOrders();
    // }
    if (page !== 1) {
      setPage(1);
    }
    fetchDataOrders();
  };

  const handleResetButton = () => {
    setSelectedStatus(null);
  };

  useEffect(() => {
    fetchDataOrders();
  }, [page]);
  return (
    <div className="p-4">
      <h1>Quản lý đơn hàng</h1>
      <Accordion className="my-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc tìm kiếm</Accordion.Header>
          <Accordion.Body>
            {/* Nhập số lượng, giá */}
            <div className="d-flex flex-row gap-3 my-2">
              <Select
                options={optionsStatus}
                placeholder="Chọn trạng thái"
                className="w-50"
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-primary" onClick={onClickSearch}>
                Tìm kiếm
              </button>
              <button className="btn btn-primary" onClick={handleResetButton}>
                Làm mới
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <OrderTable
        orders={orders}
        setPage={setPage}
        totalPages={totalPages}
        UpdateOrderStatus={UpdateOrderStatus}
        handleViewOrder={handleViewOrder}
        UpdateOrderPaymentStatus={UpdateOrderPaymentStatus}
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
