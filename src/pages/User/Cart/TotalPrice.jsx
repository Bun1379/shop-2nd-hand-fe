const TotalPrice = ({ cart }) => {
  //   const [total, setTotal] = use(0);

  //   useEffect(() => {
  //     let total = 0;
  //     cart.forEach((item) => {
  //       total += item.price * item.quantity;
  //     });
  //     setTotal(total);
  //   }, [cart]);

  return (
    <div
      className="position-fixed top-0 d-flex flex-column border border-success p-3 border-2 justify-content-between"
      style={{
        height: "220px",
        marginTop: "110px",
        right: "5%",
        width: "300px",
      }}
    >
      <p className="fw-bold fs-2">Tổng đơn hàng</p>
      <p className="">Tổng sản phẩm: </p>
      <p className="">Tổng thanh toán: </p>
      <button className="btn btn-success">Thanh toán</button>
    </div>
  );
};

export default TotalPrice;
