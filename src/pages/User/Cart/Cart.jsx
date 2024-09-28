import { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { useNavigate } from "react-router-dom";
import CartAPI from "../../../api/CartAPI";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchDataCart = async () => {
    try {
      const res = await CartAPI.GetCart();
      const rawCart = res.data.DT.items;
      const cart = rawCart.map((item) => ({
        ...item,
        selected: false,
      }));
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const data = { deleteProduct: [productId] };
      await CartAPI.UpdateQuantity(data);
      const newCart = cart.filter((item) => item.product._id !== productId);
      setCart(newCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (productId) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? { ...item, selected: !item.selected }
        : item
    );
    setCart(newCart);
  };

  const handleUpdateCart = (productId, newQuantity) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? {
            ...item,
            quantity: newQuantity,
            price: item.product.price * newQuantity,
          }
        : item
    );
    setCart(newCart);
  };
  const handleCheckOut = () => {
    const selectedItems = cart.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm để mua");
      return;
    }
    navigate("/check-out", { state: selectedItems });
  };
  useEffect(() => {
    fetchDataCart();
  }, []);
  useEffect(() => {
    const total = cart
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotal(total);
  }, [cart]);
  return (
    <div>
      <p className="fw-bold fs-3 p-3">Giỏ hàng</p>
      <div className="">
        {cart.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onCheckbox={handleCheckbox}
            handleUpdateCart={handleUpdateCart}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
        <TotalPrice total={total} handleCheckOut={handleCheckOut} />
      </div>
    </div>
  );
};
export default Cart;
