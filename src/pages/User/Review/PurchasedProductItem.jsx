const PurchasedProductItem = ({ product, handleShowReviewModal }) => {
  return (
    // <div
    //   className="w-100 mb-2 border border-2 p-2 d-flex align-items-center justify-content-between shadow border-success"
    //   style={{ height: "75px", margin: "0 auto" }}
    // >
    //   <div className="d-flex align-items-center">
    //     <img
    //       src={product.images[0] || "https://via.placeholder.com/150"}
    //       alt="product"
    //       style={{ width: "50px", height: "50px" }}
    //       className="ms-2"
    //     />
    //     <p className="fw-bold mb-0 ms-3">{product.productName}</p>{" "}
    //   </div>

    //   <p className="mb-0">Phân loại: Size {product.size}</p>
    //   <button
    //     className="btn btn-danger"
    //     onClick={() => handleShowReviewModal(product)}
    //   >
    //     Đánh giá
    //   </button>
    // </div>
    <div className="card position-relative my-2">
      <div className="card-body d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={product.images[0] || "https://via.placeholder.com/150"}
            alt="product"
            style={{ width: "75px", height: "75px" }}
            className="img-fluid rounded"
          />
          <div className="d-flex flex-column gap-2 ms-3 justify-content-between">
            <h5 className="mb-0">{product.productName}</h5>
            <p className="mb-0">Phân loại: Size {product.size}</p>
          </div>
        </div>
        <button
          className="btn btn-danger "
          onClick={() => handleShowReviewModal(product)}
          style={{ height: "fit-content" }}
        >
          Đánh giá
        </button>
      </div>
    </div>
  );
};

export default PurchasedProductItem;
