import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginSignup/Login";
import Signup from "./pages/LoginSignup/Signup";
import ForgotPW from "./pages/LoginSignup/ForgotPW";
import ResetPW from "./pages/LoginSignup/ResetPW";
import Verify from "./pages/LoginSignup/Verify";
import Home from "./pages/User/Home/Home";
import ProductItem from "./components/ProductItem/ProductItem";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./pages/User/Cart/Cart";
import Checkout from "./pages/User/Checkout/Checkout";
import UserLayout from "./layouts/UserLayout/UserLayout";
import Order from "./pages/User/Order/Order";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import UserProfile from "./pages/User/UserProfile/UserProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="check-out" element={<Checkout />} />
            <Route path="product-detail" element={<ProductDetail />} />
            <Route path="order" element={<Order />} />
            <Route path="user-profile" element={<UserProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-pw" element={<ForgotPW />} />
          <Route path="/reset-pw" element={<ResetPW />} />
          <Route path="/verify" element={<Verify />} />

          <Route path="/product" element={<ProductItem />} />


        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
