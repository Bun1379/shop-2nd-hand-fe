import Header from "../../components/Header";
import Footer from "../../components/Footer";
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