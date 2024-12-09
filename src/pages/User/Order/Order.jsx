import { useEffect, useState } from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderItem from "./OrderItem";
import OrderAPI from "../../../api/OrderAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Order = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [status, setStatus] = useState("ALL");
  const [totalOrder, setTotalOrder] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
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

  // Lọc đơn hàng theo trạng thái
  const filterOrder = () => {
    let filteredOrders = status === "ALL" ? totalOrder : totalOrder.filter((order) => order.status === status);
    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    setListOrder(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
  };

  // Tính số trang
  const calculateTotalPages = () => {
    let filteredOrders = status === "ALL" ? totalOrder : totalOrder.filter((order) => order.status === status);
    setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };


  // Nhận hàng
  const handleReceive = async (orderId) => {
    try {
      const data = { status: "DELIVERED" };
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
      fetchDataOrder();
      filterOrder();
      calculateTotalPages();
      setCurrentPage(0);
    }
  }, [status]);

  useEffect(() => {
    if (totalOrder.length > 0) {
      filterOrder();
    }
  }, [currentPage]);

  useEffect(() => {
    if (totalOrder.length > 0) {
      filterOrder();
      calculateTotalPages();
    }
  }, [totalOrder]);
  return (
    <div>
      <h3 className="text-center">Đơn hàng của bạn</h3>
      <OrderStatusBar
        status={status}
        setStatus={setStatus}
        totalOrder={totalOrder}
      />
      <div className="mt-4">
        {listOrder.length === 0 && (
          <div className="text-center  text-primary">Không có đơn hàng nào</div>
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
        {listOrder.length > 0 && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              nextLabel="Sau >"
              previousLabel="< Trước"
              breakLabel="..."
              onPageChange={handlePageClick}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
