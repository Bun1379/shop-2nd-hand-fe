import Header from "../components/Header";
import Footer from "../components/Footer";
const UserLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="container">{children}</div>
            <Footer />
        </>
    );
};



export default UserLayout;