import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import UploadAPI from "../../../api/UploadAPI";
import UserAPI from "../../../api/UserAPI";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import BranchAPI from "../../../api/BranchAPI";

const ModalUpdateUser = ({ user, showUpdate, setShowUpdate }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [userBranch, setUserBranch] = useState([]);
  const [branch, setBranch] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (role === "MANAGER") {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
  }, [role]);

  const optionRole = [
    { value: "ADMIN", label: "Admin" },
    { value: "MANAGER", label: "Manager" },
    { value: "USER", label: "User" },
  ];

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setEmail("");
    setUsername("");
    setRole("");
    setIsManager(false);
    setBranch([]);
    setUserBranch([]);
    setIsVerified(false);
    setIsActive(false);
    setPreviewImage("");
    setImage(null);
  };

  const handleGetBranch = async () => {
    try {
      const response = await BranchAPI.getAllBranches();
      setBranch(response.data.DT.map((b) => ({ value: b._id, label: b.name })));
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("role", role);
      formData.append("is_verified", isVerified);
      formData.append("is_active", isActive);
      if (isManager) {
        formData.append("branch", JSON.stringify(userBranch));
      } else {
        formData.append("branch", JSON.stringify([]));
      }

      if (image) {
        const response = await UploadAPI.Upload(image);
        formData.append("image", response.data.DT);
      }

      const response = await UserAPI.PutUpdateUserAdmin(user._id, formData);
      if (response.status === 200) {
        toast.success("Cập nhật thông tin người dùng thành công");
        handleClose();
      }
    } catch (error) {
      console.log(error.response.data.EM);
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    setEmail(user.email);
    setUsername(user.username);
    setRole(user.role);
    setIsVerified(user.is_verified);
    setIsActive(user.is_active);
    setPreviewImage(user.image);
    setIsManager(user.branch?.length > 0);
    if (user.branch?.length > 0) setUserBranch(user.branch);
    handleGetBranch();
  }, [user]);

  return (
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
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="isAdmin">Vai trò</label>
          <Select
            id="isAdmin"
            placeholder="Chọn vai trò"
            options={optionRole}
            value={optionRole.find((option) => option.value === role)}
            onChange={(value) => setRole(value.value)}
          />
        </div>
        <div className="form-group">
          {isManager && (
            <div className="form-group">
              <label htmlFor="branch">Chi nhánh</label>
              <Select
                isMulti
                options={branch}
                value={branch.filter((b) => userBranch.includes(b.value))}
                onChange={(value) => setUserBranch(value.map((v) => v.value))}
              />
            </div>
          )}
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
            Chọn ảnh
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
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateUser;
