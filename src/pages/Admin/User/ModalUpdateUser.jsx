import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import UploadAPI from "../../../api/UploadAPI";
import UserAPI from "../../../api/UserAPI";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ModalUpdateUser = ({ user, showUpdate, setShowUpdate }) => {
  const options = [
    { value: true, label: "Admin" },
    { value: false, label: "User" },
  ];
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState({ value: false, label: "User" });
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
    setAddress("");
    setRole({ value: false, label: "User" });
    setPreviewImage("");
    setImage(null);
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("is_admin", role.value);
      if (image) {
        const respone = await UploadAPI.Upload(image);
        formData.append("image", respone.data.DT);
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
    setAddress(user.address);
    setRole({ value: user.is_admin, label: user.is_admin ? "Admin" : "User" });
    setPreviewImage(user.image);
  }, [user]);

  return (
    <>
      <Modal show={showUpdate} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="code">Email</label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Tên người dùng</label>
            <input
              type="text"
              className="form-control"
              id="discount"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <ReactSelect
              options={options}
              value={role}
              onChange={(selected) => setRole(selected)}
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
              onChange={(event) => handleUploadImage(event)}
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
    </>
  );
};

export default ModalUpdateUser;
