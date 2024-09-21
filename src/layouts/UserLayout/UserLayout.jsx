import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserLayout.css";
const UserLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="user-layout-container">{children}</div>
            <Footer />
        </>
    );
};

export default UserLayout;