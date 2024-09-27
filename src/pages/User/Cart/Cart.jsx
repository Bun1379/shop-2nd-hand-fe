import UserLayout from "../../../layouts/UserLayout/UserLayout";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";

const Cart = () => {
  return (
    <UserLayout>
      Hello there
      <div className="pt-3">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <TotalPrice />
      </div>
    </UserLayout>
  );
};
export default Cart;
