import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import OrderTable from "./OrderTable";
import ModalViewOrder from "./ModalViewOrder";
import { toast } from "react-toastify";
import { Accordion, Button, Form } from "react-bootstrap";
import Select from "react-select";
import OrderStatusBar from "../../User/Order/OrderStatusBar";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [sortPrice, setSortPrice] = useState(""); // Thêm state để lưu lựa chọn sắp xếp giá

  const handleViewOrder = (order) => {
    setOrder(order);
    setShowViewOrder(true);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Lọc theo trạng thái
    if (status !== "ALL") {
      filtered = filtered.filter((order) => order.status === status);
    }

    // Lọc theo khoảng thời gian
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= startDate && new Date(order.createdAt) <= endDate
      );
    }

    // Lọc theo giá tiền
    if (priceRange.minPrice || priceRange.maxPrice) {
      filtered = filtered.filter((order) => {
        const orderTotal = order.totalAmount;
        const minPrice = priceRange.minPrice ? parseFloat(priceRange.minPrice) : 0;
        const maxPrice = priceRange.maxPrice ? parseFloat(priceRange.maxPrice) : Infinity;
        return orderTotal >= minPrice && orderTotal <= maxPrice;
      });
    }

    // Lọc theo phương thức thanh toán
    if (paymentMethod) {
      filtered = filtered.filter((order) => order.paymentMethod === paymentMethod);
    }

    // Sắp xếp theo giá
    if (sortPrice === "asc") {
      filtered = filtered.sort((a, b) => a.totalAmount - b.totalAmount); // Sắp xếp từ thấp đến cao
    } else if (sortPrice === "desc") {
      filtered = filtered.sort((a, b) => b.totalAmount - a.totalAmount); // Sắp xếp từ cao đến thấp
    }

    setFilteredOrders(filtered);
  };


  const handleClearFilters = () => {
    setDateRange({ startDate: "", endDate: "" });
    setPriceRange({ minPrice: "", maxPrice: "" });
    setPaymentMethod("");
    setSortPrice("");
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
      const res = await OrderAPI.GetOrderByAdmin();
      if (res.status === 200) {
        setOrders(res.data.DT.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, status, dateRange, priceRange, paymentMethod, sortPrice]);

  return (
    <div className="p-4">
      <h1>Quản lý đơn hàng</h1>
      <OrderStatusBar
        status={status}
        setStatus={setStatus}
        totalOrder={orders}
      />
      <Accordion defaultActiveKey="1" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc theo</Accordion.Header>
          <Accordion.Body>
            {/* Lọc theo khoảng thời gian */}
            <Form.Group>
              <Form.Label>Khoảng thời gian</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
                <span className="mx-2">đến</span>
                <Form.Control
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                />
              </div>
            </Form.Group>

            {/* Lọc theo giá tiền */}
            <Form.Group>
              <Form.Label>Khoảng giá</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="Từ"
                  value={priceRange.minPrice}
                  onChange={(e) => setPriceRange({ ...priceRange, minPrice: e.target.value })}
                />
                <span className="mx-2">đến</span>
                <Form.Control
                  type="number"
                  placeholder="Đến"
                  value={priceRange.maxPrice}
                  onChange={(e) => setPriceRange({ ...priceRange, maxPrice: e.target.value })}
                />
              </div>
            </Form.Group>

            {/* Lọc theo cách sắp xếp giá */}
            <Form.Group>
              <Form.Label>Sắp xếp theo giá</Form.Label>
              <Select
                options={[
                  { value: "asc", label: "Thấp đến cao" },
                  { value: "desc", label: "Cao đến thấp" },
                ]}
                onChange={(selectedOption) => setSortPrice(selectedOption?.value || "")}
                value={sortPrice ? { value: sortPrice, label: sortPrice === "asc" ? "Thấp đến cao" : "Cao đến thấp" } : null}
              />
            </Form.Group>

            {/* Lọc theo phương thức thanh toán */}
            <Form.Group>
              <Form.Label>Phương thức thanh toán</Form.Label>
              <Select
                options={[
                  { value: "COD", label: "COD" },
                  { value: "ONLINE", label: "Thanh toán trực tuyến" },
                ]}
                onChange={(selectedOption) => setPaymentMethod(selectedOption?.value || "")}
                value={paymentMethod ? { value: paymentMethod, label: paymentMethod === "COD" ? "COD" : "Thanh toán trực tuyến" } : null}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="danger" onClick={handleClearFilters} className="ms-2">Xóa bộ lọc</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <OrderTable
        orders={filteredOrders}
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
