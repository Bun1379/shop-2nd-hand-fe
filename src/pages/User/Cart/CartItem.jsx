import { useState, useEffect } from "react";
import CartAPI from "../../../api/CartAPI";
import { toast } from "react-toastify";

const CartItem = ({
  item,
  onCheckbox,
  handleUpdateCart,
  handleDeleteProduct,
}) => {
  const productId = item.product._id;
  const initialQuantity = item.quantity;
  const maxQuantity = item.product.quantity;

  const [quantity, setQuantity] = useState(item.quantity);
  const [isChecked, setIsChecked] = useState(item.selected);
  const [totalPrice, setTotalPrice] = useState(
    item.product.price * initialQuantity
  );

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    onCheckbox(productId);
  };

  const updateQuantity = async (newQuantity) => {
    try {
      await CartAPI.UpdateQuantity({
        productId: productId,
        quantity: newQuantity,
      });
      setQuantity(newQuantity);
      handleUpdateCart(productId, newQuantity);
    } catch (error) {
      console.log(error.response?.data || "API error");
      toast.error(error.response?.data?.EM);
    }
  };

  const handleQuantity = (event) => {
    const { value } = event.target;

    if (/^\d*$/.test(value)) {
      const validQuantity = Math.max(1, value);
      if (maxQuantity && validQuantity > maxQuantity) {
        toast.error(`Số lượng tối đa là ${maxQuantity}`);
        updateQuantity(maxQuantity);
        return;
      }
      updateQuantity(validQuantity);
    }
  };

  const handleQuantityButton = (newQuantity) => {
    const validQuantity = Math.max(1, newQuantity);
    if (maxQuantity && validQuantity > maxQuantity) {
      toast.error(`Số lượng tối đa là ${maxQuantity}`);
      updateQuantity(maxQuantity);
      return;
    }
    updateQuantity(validQuantity);
  };

  useEffect(() => {
    setTotalPrice(item.product.price * quantity);
  }, [quantity]);

  return (
    <div
      className="shadow w-75 border border-success mb-2 border-2 p-2 d-flex align-items-center"
      style={{ height: "100px" }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        // id={`flexCheckDefault${index}`}
        checked={isChecked}
        onChange={handleCheckbox}
      />
      <img
        src={item.product.images[0]}
        alt="product"
        style={{ width: "75px", height: "75px" }}
        className="ms-4"
      />
      <div className="d-flex flex-column ms-4">
        <p className="fw-bold">{item.product.productName}</p>
        <p>Phân loại: </p>
      </div>
      <div className="d-flex flex-row ms-auto gap-3 align-items-center">
        <p className="mb-0">{item.product.price}</p>
        <div className="d-flex">
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleQuantityButton(parseInt(quantity) - 1)}
          >
            -
          </button>
          <input
            type="text"
            className="form-control mx-2"
            onChange={handleQuantity}
            value={quantity}
            style={{ width: "50px" }}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleQuantityButton(parseInt(quantity) + 1)}
          >
            +
          </button>
        </div>
        <p className="mb-0">{totalPrice}</p>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteProduct(item.product._id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};
export default CartItem;
