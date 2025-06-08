import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import BranchAPI from "../../../api/BranchAPI";
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
  const [sortPrice, setSortPrice] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]); // Lưu các chi nhánh được chọn
  const [branches, setBranches] = useState([]); // Lưu danh sách chi nhánh

  const user = JSON.parse(localStorage.getItem("user"));

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
      setBranches([
        { value: "ALL", label: "Tất cả chi nhánh" },
        ...userBranches,
      ]);
      setSelectedBranches(["ALL"]);
    }
  }, []);

  const handleViewOrder = (order) => {
    setOrder(order);
    setShowViewOrder(true);
  };

  const filterOrders = () => {
    let filtered = orders;

    if (status !== "ALL") {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt) >= startDate &&
          new Date(order.createdAt) <= endDate
      );
    }

    if (priceRange.minPrice || priceRange.maxPrice) {
      filtered = filtered.filter((order) => {
        const orderTotal = order.totalAmount + (order.shippingFee ?? 0);
        const minPrice = priceRange.minPrice
          ? parseFloat(priceRange.minPrice)
          : 0;
        const maxPrice = priceRange.maxPrice
          ? parseFloat(priceRange.maxPrice)
          : Infinity;
        return orderTotal >= minPrice && orderTotal <= maxPrice;
      });
    }

    if (paymentMethod) {
      filtered = filtered.filter(
        (order) => order.paymentMethod === paymentMethod
      );
    }

    if (!selectedBranches.includes("ALL")) {
      filtered = filtered.filter((order) =>
        selectedBranches.includes(order.branch?._id)
      );
    }

    if (sortPrice === "asc") {
      filtered = filtered.sort((a, b) => a.totalAmount - b.totalAmount);
    } else if (sortPrice === "desc") {
      filtered = filtered.sort((a, b) => b.totalAmount - a.totalAmount);
    }

    setFilteredOrders(filtered);
  };

  const handleClearFilters = () => {
    setDateRange({ startDate: "", endDate: "" });
    setPriceRange({ minPrice: "", maxPrice: "" });
    setPaymentMethod("");
    setSortPrice("");
    setSelectedBranches(
      user.role === "ADMIN" ? ["ALL"] : user.branch.map((b) => b._id)
    );
  };

  const handleConfirm = () => {
    setOrders([...orders]);
    filterOrders();
  };

  useEffect(() => {
    fetchDataOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, status, selectedBranches]);

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
      const res = await OrderAPI.UpdateOrderPaymentStatus(id, data);
      if (res.status === 200) {
        toast.success("Cập nhật trạng thái thanh toán thành công");
        fetchDataOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1>Quản lý đơn hàng</h1>
      <OrderStatusBar
        status={status}
        setStatus={setStatus}
        totalOrder={orders}
        selectedBranches={selectedBranches}
      />

      <Accordion defaultActiveKey="1" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc theo</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Label>Chi nhánh</Form.Label>
              <Select
                options={branches}
                isMulti
                value={branches.filter((b) =>
                  selectedBranches.includes(b.value)
                )}
                onChange={(selectedOptions) =>
                  setSelectedBranches(
                    selectedOptions.map((option) => option.value)
                  )
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Khoảng thời gian</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, startDate: e.target.value })
                  }
                />
                <span className="mx-2">đến</span>
                <Form.Control
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, endDate: e.target.value })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Khoảng giá</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="Từ"
                  value={priceRange.minPrice}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, minPrice: e.target.value })
                  }
                />
                <span className="mx-2">đến</span>
                <Form.Control
                  type="number"
                  placeholder="Đến"
                  value={priceRange.maxPrice}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, maxPrice: e.target.value })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Sắp xếp theo giá</Form.Label>
              <Select
                options={[
                  { value: "asc", label: "Thấp đến cao" },
                  { value: "desc", label: "Cao đến thấp" },
                ]}
                onChange={(selectedOption) =>
                  setSortPrice(selectedOption?.value || "")
                }
                value={
                  sortPrice
                    ? {
                      value: sortPrice,
                      label:
                        sortPrice === "asc" ? "Thấp đến cao" : "Cao đến thấp",
                    }
                    : null
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="primary"
                onClick={handleConfirm}
                className="ms-2"
              >
                Xác nhận
              </Button>
              <Button
                variant="danger"
                onClick={handleClearFilters}
                className="ms-2"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <OrderTable
        orders={filteredOrders}
        handleViewOrder={handleViewOrder}
        UpdateOrderStatus={UpdateOrderStatus}
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
