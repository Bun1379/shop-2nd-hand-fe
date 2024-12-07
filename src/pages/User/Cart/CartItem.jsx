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
    <div className="card shadow-sm mb-3 p-3 w-75">
      <div className="row align-items-center">
        <div className="col-auto">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
        </div>
        <div className="col-auto">
          <img
            src={item.product.images[0]}
            alt="product"
            className="img-fluid rounded"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
        <div className="col">
          <h5 className="card-title">{item.product.productName}</h5>
          <p className="mb-0 me-3">Giá: {item.product.price.toLocaleString()}đ</p>
        </div>
        <div className="col-auto d-flex align-items-center">
          <div className="d-flex align-items-center">
            <p className="mb-0 fw-bold mx-2">{totalPrice.toLocaleString()}đ</p>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuantityButton(parseInt(quantity) - 1)}
            >
              -
            </button>
            <input
              type="text"
              className="form-control mx-2 text-center"
              onChange={handleQuantity}
              value={quantity}
              style={{ width: "50px" }}
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuantityButton(parseInt(quantity) + 1)}
            >
              +
            </button>
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => handleDeleteProduct(item.product._id)}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
