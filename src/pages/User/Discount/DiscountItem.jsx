const DiscountItem = ({ discount }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isUsed = discount.usersUsed.includes(user._id);
  return (
    <div className="card my-2 shadow border-1" style={{ width: "49%" }}>
      <div className="card-body">
        <h5 className="card-title">{discount.discountCode}</h5>
        <p className="card-text">
          Giảm giá: {discount.discountPercentage}%
        </p>
        {discount.expiredAt && (
          <p className="card-text">
            Ngày hết hạn: {new Date(discount.expiredAt).toLocaleDateString('vi-VN')}
          </p>
        )}
        {isUsed ? (
          <p className="card-text text-danger">Đã sử dụng</p>
        ) :
          discount.expiredAt && new Date(discount.expiredAt) < new Date() ? (
            <p className="card-text text-warning">Hết hạng sử dụng</p>
          ) :
            (
              <p className="card-text text-success">Chưa sử dụng</p>
            )}

      </div>
    </div>
  );
};

export default DiscountItem;
