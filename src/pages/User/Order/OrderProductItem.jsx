const OrderProductItem = ({ product, quantity }) => {
  return (
    <div
      className="w-100 mb-2 border-2 p-2 d-flex align-items-center justify-content-between"
      style={{ height: "75px", margin: "0 auto" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt="product"
          style={{ width: "50px", height: "50px" }}
          className="ms-4"
        />
        <p className="fw-bold mb-0 ms-3">{product.productName}</p>{" "}
      </div>

      <p className="mb-0">Phân loại: Size {product.size}</p>

      <div className="d-flex flex-row gap-5 align-items-center pe-5">
        <p className="mb-0">Số lượng: {quantity}</p>
        <p className="mb-0">Thành tiền: {product.price * quantity}</p>
      </div>
    </div>
  );
};
export default OrderProductItem;
