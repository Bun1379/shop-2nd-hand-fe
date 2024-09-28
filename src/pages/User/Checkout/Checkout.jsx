import { useLocation } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import Select from "react-select";

const Checkout = () => {
  const location = useLocation();
  const items = location.state;

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

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
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      address: userInfo.address,
      phone: userInfo.phone,
      name: userInfo.username,
      paymentMethod: selectedPaymentMethod,
    };
    try {
      await OrderAPI.CreateOrder(data);
      alert("Mua hàng thành công");
      //   navigation.navigate("Order", { initStatus: "PENDING" });
    } catch (error) {
      console.log(error.response?.data || "API error");
      alert(error.response?.data?.EM);
    }
  };

  useEffect(() => {
    fetchDataUser();
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
  }, []);
  console.log(items);
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
        {items.map((item) => (
          <CheckoutItem key={item.product._id} item={item} />
        ))}
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
              <p className="fw-bold mb-0 ms-3">
                Phương thức thanh toán:
                <Select
                  options={options}
                  defaultValue={selectedPaymentMethod}
                  onChange={setSelectedPaymentMethod}
                />
              </p>
              <p className="fw-bold mb-0 ms-3">Mã khuyến mãi: ...</p>
              <p className="fw-bold mb-0 ms-3">Tổng tiền: {total}</p>
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
