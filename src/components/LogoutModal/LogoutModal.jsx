import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("manager");
    localStorage.removeItem("recentlyViewed");
    toast.success("Đăng xuất thành công !");
    navigate("/login");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận đăng xuất</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
