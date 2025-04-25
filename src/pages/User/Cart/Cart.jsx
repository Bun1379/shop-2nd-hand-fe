import { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { useNavigate } from "react-router-dom";
import CartAPI from "../../../api/CartAPI";
import { toast } from "react-toastify";
import { updateQuantityCart } from "../../../components/Header/Header";

const Cart = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

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
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      const newCart = cart.filter((item) => item.product._id !== productId);
      setCart(newCart);
      updateQuantityCart();
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
    const totalProduct = cart.filter((item) => item.selected).length;
    setTotalProduct(totalProduct);
  }, [cart]);
  return (
    <div>
      <p className="fw-bold fs-3 p-3">Giỏ hàng</p>
      {cart.length === 0 && (
        <div className="text-center">
          <p>Giỏ hàng của bạn đang trống</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Tiếp tục mua hàng
          </button>
        </div>
      )}
      <div className="row">
        <div className="col-md-9 col-12">
          {cart.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onCheckbox={handleCheckbox}
              handleUpdateCart={handleUpdateCart}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>

        <div className="col-md-3 col-12 mt-3 mt-md-0">
          <div
            className="d-none d-md-block"
            style={{ position: "sticky", top: "100px" }}
          >
            <TotalPrice
              total={total}
              handleCheckOut={handleCheckOut}
              totalProduct={totalProduct}
            />
          </div>

          <div className="d-block d-md-none">
            <TotalPrice
              total={total}
              handleCheckOut={handleCheckOut}
              totalProduct={totalProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
