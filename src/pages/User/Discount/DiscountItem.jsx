const DiscountItem = ({ discount }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isUsed = discount.usersUsed.includes(user._id);
  return (
    <div className="card" style={{ width: "49%" }}>
      <div className="card-body">
        <h5 className="card-title">{discount.discountCode}</h5>
        <p className="card-text">
          Discount percentage: {discount.discountPercentage}%
        </p>
        {discount.expiredDate && (
          <p className="card-text">
            Expired date: {new Date(discount.expiredDate).toLocaleDateString()}
          </p>
        )}
        {isUsed ? (
          <p className="card-text text-danger">Đã sử dụng</p>
        ) : (
          <p className="card-text text-success">Chưa sử dụng</p>
        )}
      </div>
    </div>
  );
};

export default DiscountItem;
