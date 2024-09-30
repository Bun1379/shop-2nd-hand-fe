const CheckoutItem = ({ item }) => {
  return (
    <div
      className="shadow border w-75 border-success mb-2 border-2 p-2 d-flex align-items-center justify-content-between"
      style={{ height: "75px", margin: "0 auto" }}
    >
      <div className="d-flex align-items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="product"
          style={{ width: "50px", height: "50px" }}
          className="ms-4"
        />
        <p className="fw-bold mb-0 ms-3">{item.product.productName}</p>{" "}
      </div>

      <p className="mb-0">Phân loại: Size {item.product.size}</p>

      <div className="d-flex flex-row gap-5 align-items-center pe-5">
        <p className="mb-0">{item.product.price}</p>
        <p className="mb-0">{item.quantity}</p>
        <p className="mb-0">{item.product.price * item.quantity}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
