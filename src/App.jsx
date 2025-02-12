import "bootstrap/dist/css/bootstrap.min.css";
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
import Cart from "./pages/User/Cart/Cart";
import Checkout from "./pages/User/Checkout/Checkout";
import UserLayout from "./layouts/UserLayout/UserLayout";
import Order from "./pages/User/Order/Order";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import OrderDetail from "./pages/User/Order/OrderDetail";
import Search from "./pages/User/Search/Search";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Product from "./pages/Admin/Product/Product";
import Discount from "./pages/Admin/Discount/Discount";
import User from "./pages/Admin/User/User";
import ManageOrder from "./pages/Admin/Order/MangeOrder";
import PaymentResult from "./pages/User/Checkout/PaymentResult";
import { SocketProvider } from "./layouts/SocketContext";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import CancelRequestAdmin from "./pages/Admin/CancelRequest/CancelRequestAdmin";
import ManageBanner from "./pages/Admin/Banner/ManageBanner";
import ManageCategory from "./pages/Admin/Category/MangeCategory";
import ManageColor from "./pages/Admin/Color/ManageColor";
import ManageBranch from "./pages/Admin/Branch/ManageBranch";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="check-out" element={<Checkout />} />
            <Route path="product-detail" element={<ProductDetail />} />
            <Route path="order" element={<Order />} />
            <Route path="order/:orderId" element={<OrderDetail />} />
            <Route path="search" element={<Search />} />
            <Route
              path="user-profile"
              element={<UserProfile initialSection="profile" />}
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-pw" element={<ForgotPW />} />
          <Route path="/reset-pw" element={<ResetPW />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/product" element={<ProductItem />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="product" element={<Product />} />
            <Route path="discount" element={<Discount />} />
            <Route path="user" element={<User />} />
            <Route path="order" element={<ManageOrder />} />
            <Route path="cancel-request" element={<CancelRequestAdmin />} />
            <Route path="banner" element={<ManageBanner />} />
            <Route path="category" element={<ManageCategory />} />
            <Route path="color" element={<ManageColor />} />
            <Route path="branch" element={<ManageBranch />} />
          </Route>

          <Route path="/payment/result" element={<PaymentResult />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
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
    </SocketProvider>
  );
}

export default App;
