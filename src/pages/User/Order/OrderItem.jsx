import OrderProductItem from "./OrderProductItem";

const OrderItem = ({ order }) => {
  return (
    <div
      className="bg-white w-75 border border-2 border-success d-flex flex-column justify-content-center mb-2"
      style={{ height: "auto", margin: "0 auto" }}
    >
      <div
        className="d-flex flex-row justify-content-between align-items-center border-bottom border-2"
        style={{ height: "60px" }}
      >
        <p className="fw-bold mb-0 ms-3">Mã đơn hàng: {order._id}</p>
        <p className="fw-bold mb-0 me-3 text-success">{order.status}</p>
      </div>
      <div>
        {order.products.map((product) => (
          <OrderProductItem
            key={product._id}
            product={product.product}
            quantity={product.quantity}
          />
        ))}
      </div>
      <div
        className="border-top border-2 d-flex justify-content-end align-items-center"
        style={{ height: "60px" }}
      >
        <span className="fw-bold me-3">Tổng tiền: {order.totalAmount}</span>
      </div>
    </div>
  );
};
export default OrderItem;
