import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserLayout.css";
import { Outlet } from "react-router-dom";
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="user-layout-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
