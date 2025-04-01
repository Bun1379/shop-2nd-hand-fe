import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserLayout.css";
import { Outlet } from "react-router-dom";
import ContactButton from "../../components/ContactButton";
import { Container } from "react-bootstrap";
const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container style={{ minHeight: "100vh", marginTop: 100 }}>
        <Outlet />
      </Container>
      <Footer />
      <ContactButton />
    </>
  );
};

export default UserLayout;
