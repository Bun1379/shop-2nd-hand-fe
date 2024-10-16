const FavouriteItem = ({ product, handleRemoveFavourite }) => {
  return (
    <div
      className="d-flex flex-row p-2 my-2 border border-primary border-2 align-items-center"
      style={{ height: "75px" }}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        style={{ width: "50px", height: "50px" }}
      />
      <div className="d-flex flex-column ms-2">
        <p className="mb-0 fw-bold">{product.productName}</p>
        <p className="mb-0">Giá: {product.price} VND</p>
      </div>
      <button
        className="btn btn-danger ms-auto"
        onClick={() => handleRemoveFavourite(product._id)}
      >
        Bỏ yêu thích
      </button>
    </div>
  );
};
export default FavouriteItem;
