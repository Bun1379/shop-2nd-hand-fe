import { useState } from "react";

const CartItem = ({}) => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (event) => {
    const { value } = event.target;

    // Kiểm tra giá trị (ví dụ: chỉ cập nhật nếu giá trị là số)
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };
  return (
    <div
      className="shadow w-75 border border-success mb-2 border-2 p-2 d-flex align-items-center"
      style={{ height: "100px" }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        // id={`flexCheckDefault${index}`}
        // checked={item.isSelected}
        // onChange={(event) =>
        //   handleCheckBox(event, item.id, data.questionId)
        // }
      />
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        style={{ width: "75px", height: "75px" }}
        className="ms-4"
      />
      <div className="d-flex flex-column ms-4">
        <p>Product Name</p>
        <p>Phân loại: </p>
      </div>
      <div className="d-flex flex-row ms-auto gap-3 align-items-center">
        <p>Price</p>
        <div className="d-flex">
          <button className="btn btn-outline-secondary">-</button>
          <input
            type="text"
            className="form-control mx-2"
            onChange={handleQuantity}
            value={quantity}
            style={{ width: "50px" }}
          />
          <button className="btn btn-outline-secondary">+</button>
        </div>
        <button className="btn btn-danger">Xóa</button>
      </div>
    </div>
  );
};
export default CartItem;
