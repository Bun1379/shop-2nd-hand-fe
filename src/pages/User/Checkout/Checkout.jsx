import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import Select from "react-select";
import { toast } from "react-toastify";
import DiscountAPI from "../../../api/DiscountAPI";
import PaymentAPI from "../../../api/PaymentAPI";
import UserAPI from "../../../api/UserAPI";

const Checkout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const items = location.state;
  const navigation = useNavigate();

  const options = [
    { value: "COD", label: "Tiền mặt" },
    { value: "ONLINE", label: "Chuyển khoản" },
  ];

  const [userInfo, setUserInfo] = useState({
    username: "",
    phone: "",
    address: "",
  });
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

  const fetchDataUser = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    if (!userInfo.username || !userInfo.phone || !userInfo.address) {
      toast.error("Vui lòng nhập đầy đủ thông tin người nhận");
      return;
    }
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: afterDiscount,
      address: userInfo.address,
      phone: userInfo.phone,
      name: userInfo.username,
      paymentMethod: selectedPaymentMethod.value,
      discountCode: discountCode,
    };
    try {
      if (selectedPaymentMethod.value === "ONLINE") {
        const PaymentData = { amount: afterDiscount };
        const response = await PaymentAPI.postPayments(PaymentData);
        if (response.status === 200) {
          const paymentUrl = response.data.DT;
          window.location.href = paymentUrl;
        }
      } else if (selectedPaymentMethod.value === "COD") {
        await OrderAPI.CreateOrder(data);
        toast.success("Đặt hàng thành công");
        navigation("/user-profile", { state: { initialSection: "orders" } });
      }
    } catch (error) {
      toast.error(error.response?.data?.EM);
      console.log(error);
    }
  };

  const handleCouponClick = async () => {
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
          response.data.DT.discounts.map((item) => {
            return {
              value: item._id,
              label: item.discountCode + " - " + item.discountPercentage + "%",
            };
          })
        );
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchDataUser();
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
          <div className="  d-flex align-items-center justify-content-around">
            <div className="d-flex flex-column justify-content-between gap-4">
              <p className="fw-bold mb-0 ms-3 d-flex gap-3">
                Người nhận:
                <input
                  className="form-control"
                  type="text"
                  value={userInfo.username}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, username: event.target.value })
                  }
                />
              </p>
              <p className="fw-bold mb-0 ms-3 d-flex gap-3">
                Địa chỉ nhận hàng:{" "}
                <input
                  className="form-control"
                  type="text"
                  value={userInfo.address}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, address: event.target.value })
                  }
                />
              </p>
              <p className="fw-bold mb-0 ms-3 d-flex gap-3">
                Số điện thoại:{" "}
                <input
                  className="form-control"
                  type="text"
                  value={userInfo.phone}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, phone: event.target.value })
                  }
                />
              </p>
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
