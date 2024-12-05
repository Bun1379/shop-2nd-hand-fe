import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserLayout.css";
import { Outlet } from "react-router-dom";
import ContactButton from "../../components/ContactButton";
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="user-layout-container">
        <Outlet />
      </div>
      <Footer />
      <ContactButton />
    </>
  );
};

export default UserLayout;
