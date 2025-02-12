import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import Select from "react-select";
import { toast } from "react-toastify";
import DiscountAPI from "../../../api/DiscountAPI";
import PaymentAPI from "../../../api/PaymentAPI";
import UserAPI from "../../../api/UserAPI";
import BranchAPI from "../../../api/BranchAPI";
import AddressAPI from "../../../api/AddressAPI";
import ModalSelectAddress from "./ModalSelectAddress";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { updateQuantityCart } from "../../../components/Header/Header";
const Checkout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const items = location.state;
  console.log(items);
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const options = [
    { value: "COD", label: "Tiền mặt" },
    { value: "ONLINE", label: "Chuyển khoản" },
  ];
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    value: "COD",
    label: "Tiền mặt",
  });
  const [coupon, setCoupon] = useState({
    value: "",
    label: "",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [listDiscount, setListDiscount] = useState([]);
  //Pick Branch
  //begin
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const fetchDataBranch = async () => {
    try {
      const response = await BranchAPI.getAllBranches();
      if (response.status === 200) {
        setBranchList(
          response.data.DT.map((branch) => ({
            value: branch._id,
            label: branch.address,
          }))
        );
      }
    } catch (error) {
      toast.error("Lỗi: " + error.response.data.EM);
    }
  };
  //end

  const loadAddressList = async () => {
    try {
      const response = await AddressAPI.GetAddressByUser();
      if (response.status === 200) {
        const addresses = response.data.DT;
        if (addresses.length === 0) {
          toast.error("Bạn chưa có địa chỉ. Vui lòng thêm địa chỉ giao hàng");
          navigation("/user-profile", {
            state: { initialSection: "addresses" },
          });
          return;
        }
        setAddressList(addresses);

        const defaultAddress = addresses.find(
          (address) => address.isDefault === true
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
          console.log(selectedAddress);
        }
      }
    } catch (error) {
      toast.error("Lỗi: " + error.response.data.EM);
    }
  };

  const handleCheckout = async () => {
    if (selectedBranch === null) {
      toast.error("Vui lòng chọn chi nhánh giao hàng");
      return;
    }
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        priceAtCreate: item.price,
      })),
      totalAmount: afterDiscount,
      address: `${selectedAddress.address}, ${selectedAddress.district}, ${selectedAddress.ward}, ${selectedAddress.city}`,
      phone: selectedAddress.phone,
      name: selectedAddress.name,
      paymentMethod: selectedPaymentMethod.value,
      discountCode: discountCode,
      branchId: selectedBranch?.value,
    };
    try {
      const rs = await OrderAPI.CreateOrder(data);
      if (rs.status === 200) {
        toast.success("Đăt hàng thành công");
        updateQuantityCart();
      }
      if (selectedPaymentMethod.value === "ONLINE") {
        const PaymentData = {
          amount: afterDiscount,
          orderId: rs.data.DT._id,
          returnUrl: "https://ishio-shop.onrender.com/payment/result",
        };
        const response = await PaymentAPI.postPayment(PaymentData);
        if (response.status === 200) {
          const paymentUrl = response.data.DT;
          window.open(paymentUrl, "_blank");
          navigation("/", { replace: true });
        }
      } else {
        navigation(
          "/user-profile",
          { state: { initialSection: "orders" } },
          { replace: true }
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.EM);
    }
  };

  const handleCouponClick = async () => {
    if (!coupon.value) {
      toast.error("Vui lòng chọn mã giảm giá");
      return;
    }
    try {
      const response = await DiscountAPI.getDiscountPercentages(coupon.value);
      if (response.status === 200) {
        setAfterDiscount(
          (total * (100 - response.data.DT.discountPercentage)) / 100
        );
        setDiscountCode(response.data.DT._id);
        toast.success("Áp dụng mã giảm giá thành công");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  const fetchListDiscount = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      if (response.status === 200) {
        console.log(response.data.DT.discounts);
        setListDiscount(
          response.data.DT.discounts
            .filter(
              (discount) =>
                !discount?.usersUsed?.includes(response.data.DT._id) &&
                (new Date(discount.expiredAt) > new Date() ||
                  discount.expiredAt == null)
            )
            .map((discount) => ({
              value: discount._id,
              label: discount.discountCode,
            }))
        );
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    loadAddressList();
    fetchListDiscount();
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
    setAfterDiscount(total);
    fetchDataBranch();
  }, []);

  return (
    <>
      <h1 className="text-center p-2">Thanh toán</h1>
      <div className="d-flex justify-content-center flex-column ">
        <div
          className="bg-success text-white p-3 rounded w-100 align-items-center mb-3"
          style={{ margin: "auto" }}
        >
          <Row className="align-items-center fw-bold">
            <Col xs={2}>Sản phẩm</Col>
            <Col xs={4}></Col>
            <Col xs={2}>Size</Col>
            <Col xs={1} className="text-center">
              Đơn giá
            </Col>
            <Col xs={1} className="text-center">
              Số lượng
            </Col>
            <Col xs={2} className="text-end">
              Thành tiền
            </Col>
          </Row>
        </div>
        <div className="w-100" style={{ margin: "0 auto" }}>
          {items.map((item) => (
            <CheckoutItem key={item.product._id} item={item} />
          ))}
        </div>

        <div
          className="d-flex flex-column shadow border w-100 border-success mb-2 border-2 p-4 gap-3"
          style={{ height: "auto", margin: "0 auto" }}
        >
          <div className="d-flex align-items-center justify-content-around">
            <div className="d-flex flex-column justify-content-between gap-4">
              <Button className="btn w-25" onClick={() => setIsModalOpen(true)}>
                Chọn Địa Chỉ
              </Button>
              {selectedAddress && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{selectedAddress.name}</h5>
                    <p className="card-text mt-1">
                      Số điện thoại: {selectedAddress.phone}
                      <br />
                      Địa chỉ: {selectedAddress.address},{" "}
                      {selectedAddress.district}, {selectedAddress.ward},{" "}
                      {selectedAddress.city}
                    </p>
                  </div>
                </div>
              )}
              <ModalSelectAddress
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                addresses={addressList}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </div>

            <div className="d-flex flex-column justify-content-between gap-2">
              <span className="fw-bold mb-0 ms-3">Phương thức thanh toán:</span>
              <Select
                options={options}
                defaultValue={selectedPaymentMethod}
                onChange={setSelectedPaymentMethod}
              />

              <span className="fw-bold mb-0 ms-3">Mã khuyến mãi: </span>
              <Select
                options={listDiscount}
                onChange={setCoupon}
                placeholder="Chọn mã khuyến mãi"
              />
              <span className="fw-bold mb-0 ms-3">Chi nhánh giao hàng: </span>
              <Select
                options={branchList}
                onChange={setSelectedBranch}
                value={selectedBranch}
                placeholder="Chọn chi nhánh giao hàng"
              />
              <button className="btn btn-primary" onClick={handleCouponClick}>
                Áp dụng
              </button>
              <p className="fw-bold mb-0 ms-3">
                Tổng tiền: {afterDiscount.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>
          <button
            className="btn btn-success w-25 m-auto"
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};
export default Checkout;
