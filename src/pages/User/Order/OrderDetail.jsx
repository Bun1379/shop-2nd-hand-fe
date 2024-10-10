import { useParams } from "react-router-dom";
import CheckoutItem from "../Checkout/CheckoutItem";
import OrderAPI from "../../../api/OrderAPI";
import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

const OrderDetail = ({}) => {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState({});
  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrderById(orderId);
      console.log(response.data.DT);
      const order = response.data.DT;
      setOrder(order);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataOrder();
  }, []);
  return (
    <>
      <div
        className="d-flex justify-content-between w-75 align-items-center"
        style={{ height: "75px", margin: "0 auto" }}
      >
        <span
          className="d-flex align-items-center gap-2 ms-5"
          onClick={() => {
            window.history.back();
          }}
        >
          <MdArrowBackIos />
          Trở lại
        </span>
        <div>
          <span className="text-center p-2">Mã đơn hàng: {order._id}</span>
          <span className="text-success p-2">Trạng thái: {order.status}</span>
        </div>
      </div>
      {order && order.products && order.products.length > 0 && (
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
            {order.products.map((item) => (
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
                  {order.name ? order.name : ""}
                </p>
                <p className="fw-bold mb-0 ms-3 d-flex gap-3">
                  Địa chỉ nhận hàng: {order.address ? order.address : ""}
                </p>
                <p className="fw-bold mb-0 ms-3 d-flex gap-3">
                  Số điện thoại: {order.phone ? order.phone : ""}
                </p>
              </div>

              <div className="d-flex flex-column justify-content-between gap-4">
                <p className="fw-bold mb-0 ms-3">
                  Phương thức thanh toán:
                  {order.paymentMethod === "COD" ? "Tiền mặt" : "Chuyển khoản"}
                </p>
                {order.discountCode && (
                  <p className="fw-bold mb-0 ms-3">
                    Mã khuyến mãi: {order.discountCode.discountCode} -{" "}
                    {order.discountCode.discountPercentage}%
                  </p>
                )}
                <p className="fw-bold mb-0 ms-3">
                  Tổng tiền: {order.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetail;
