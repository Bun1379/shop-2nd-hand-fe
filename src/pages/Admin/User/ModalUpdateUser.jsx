import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import UploadAPI from "../../../api/UploadAPI";
import UserAPI from "../../../api/UserAPI";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ModalUpdateUser = ({ user, showUpdate, setShowUpdate }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setEmail("");
    setUsername("");
    setPhone("");
    setIsAdmin(false);
    setIsVerified(false);
    setIsActive(false);
    setPreviewImage("");
    setImage(null);
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("is_admin", isAdmin);
      formData.append("is_verified", isVerified);
      formData.append("is_active", isActive);

      if (image) {
        const response = await UploadAPI.Upload(image);
        formData.append("image", response.data.DT);
      }

      const response = await UserAPI.PutUpdateUserAdmin(user._id, formData);
      if (response.status === 200) {
        toast.success("Update user successfully");
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    setEmail(user.email);
    setUsername(user.username);
    setPhone(user.phone);
    setIsAdmin(user.is_admin);
    setIsVerified(user.is_verified);
    setIsActive(user.is_active);
    setPreviewImage(user.image);
  }, [user]);

  return (
    <Modal show={showUpdate} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="code">Email</label>
          <input type="text" className="form-control" id="code" value={email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Tên người dùng</label>
          <input
            type="text"
            className="form-control"
            id="discount"
            value={username}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input type="tel" className="form-control" id="phone" value={phone} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="isAdmin">Admin</label>
          <Form.Check
            type="switch"
            id="isAdmin"
            label="Admin"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isVerified">Verified</label>
          <Form.Check
            type="switch"
            id="isVerified"
            label="Verified"
            checked={isVerified}
            onChange={() => setIsVerified(!isVerified)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isActive">Active</label>
          <Form.Check
            type="switch"
            id="isActive"
            label="Active"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>
        <div className="form-group">
          <label
            className="form-label label-upload btn btn-primary"
            htmlFor="labelUpload"
          >
            Upload image
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={handleUploadImage}
          />
        </div>
        <div className="form-group">
          <img
            src={previewImage}
            alt="preview"
            className="img-fluid"
            style={{ width: "100%" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateUser;
