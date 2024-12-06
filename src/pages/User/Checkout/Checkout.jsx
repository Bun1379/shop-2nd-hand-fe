import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import Select from "react-select";
import { toast } from "react-toastify";
import DiscountAPI from "../../../api/DiscountAPI";
import PaymentAPI from "../../../api/PaymentAPI";
import UserAPI from "../../../api/UserAPI";
import AddressAPI from "../../../api/AddressAPI";
import ModalSelectAddress from "./ModalSelectAddress";
import { Modal, Button, Form } from "react-bootstrap";
const Checkout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const items = location.state;
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

  const loadAddressList = async () => {
    try {
      const response = await AddressAPI.GetAddressByUser();
      if (response.status === 200) {
        const addresses = response.data.DT;
        if (addresses.length === 0) {
          toast.error("Vui lòng thêm địa chỉ giao hàng");
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
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: afterDiscount,
      address: `${selectedAddress.address}, ${selectedAddress.district}, ${selectedAddress.ward}, ${selectedAddress.city}`,
      phone: selectedAddress.phone,
      name: selectedAddress.name,
      paymentMethod: selectedPaymentMethod.value,
      discountCode: discountCode,
    };
    try {
      const rs = await OrderAPI.CreateOrder(data);
      if (rs.status === 200) {
        toast.success("Đăt hàng thành công");
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
          window.location.href = paymentUrl;
        }
      } else {
        navigation("/user-profile", { state: { initialSection: "orders" } });
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
        setListDiscount(
          response.data.DT.discounts
            .filter(
              (discount) => !discount?.usersUsed?.includes(response.data.DT._id)
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
  }, []);

  return (
    <>
      <h1 className="text-center p-2">Thanh toán</h1>
      <div className="d-flex justify-content-center flex-column">
        <div
          className="shadow border w-75 border-success mb-2 border-2 p-2 d-flex align-items-center justify-content-between"
          style={{ height: "75px", margin: "0 auto" }}
        >
          <div className="d-flex align-items-center">
            <p className="fw-bold mb-0 ms-3">Sản phẩm</p>{" "}
          </div>

          <div className="d-flex flex-row gap-3 align-items-center">
            <p className="mb-0 fw-bold">Đơn giá</p>
            <p className="mb-0 fw-bold">Số lượng</p>
            <p className="mb-0 fw-bold">Thành tiền</p>
          </div>
        </div>
        <div className="w-75" style={{ margin: "0 auto" }}>
          {items.map((item) => (
            <CheckoutItem key={item.product._id} item={item} />
          ))}
        </div>

        <div
          className="d-flex flex-column shadow border w-75 border-success mb-2 border-2 p-4 gap-3"
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

            <div className="d-flex flex-column justify-content-between gap-4">
              <span className="fw-bold mb-0 ms-3">Phương thức thanh toán:</span>
              <Select
                options={options}
                defaultValue={selectedPaymentMethod}
                onChange={setSelectedPaymentMethod}
              />

              <span className="fw-bold mb-0 ms-3">Mã khuyến mãi: </span>
              <Select options={listDiscount} onChange={setCoupon} />
              <button className="btn btn-primary" onClick={handleCouponClick}>
                Áp dụng
              </button>
              <p className="fw-bold mb-0 ms-3">Tổng tiền: {afterDiscount}</p>
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
