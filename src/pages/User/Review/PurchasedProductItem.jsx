const PurchasedProductItem = ({ product, handleShowReviewModal }) => {
  return (
    <div
      className="w-100 mb-2 border border-2 p-2 d-flex align-items-center justify-content-between shadow border-success"
      style={{ height: "75px", margin: "0 auto" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt="product"
          style={{ width: "50px", height: "50px" }}
          className="ms-2"
        />
        <p className="fw-bold mb-0 ms-3">{product.productName}</p>{" "}
      </div>

      <p className="mb-0">Phân loại: Size {product.size}</p>
      <button
        className="btn btn-danger"
        onClick={() => handleShowReviewModal(product)}
      >
        Đánh giá
      </button>
    </div>
  );
};

export default PurchasedProductItem;
