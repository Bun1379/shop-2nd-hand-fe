import { Button, Form, Modal } from "react-bootstrap";
import BannerAPI from "../../../api/BannerAPI";
import UploadAPI from "../../../api/UploadAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalUpdateBanner = ({
  showUpdate,
  setShowUpdate,
  dataUpdate,
  fetchDataBanner,
}) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setName("");
    setLink("");
    setPosition(0);
    setStatus(true);
    setImage(null);
    setPreviewImage("");
  };

  const handleUpdateBanner = async () => {
    setLoading(true);
    if (position < 0) {
      toast.error("Vị trí không được nhỏ hơn 0");
      setLoading(false);
      return;
    }
    if (!name || !link) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("url", link);
      formData.append("position", position);
      formData.append("status", status);
      if (image) {
        const respone = await UploadAPI.Upload(image);
        formData.append("image", respone.data.DT);
      }
      const response = await BannerAPI.UpdateBanner(dataUpdate._id, formData);
      if (response.status === 200) {
        toast.success("Cập nhật banner thành công");
        fetchDataBanner();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setName(dataUpdate.title || "");
      setLink(dataUpdate.url || "");
      setStatus(dataUpdate.status);
      setPreviewImage(dataUpdate.image || "");
      setPosition(dataUpdate.position || 0);
    }
  }, [showUpdate, dataUpdate]);

  return (
    <Modal show={showUpdate} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Tên banner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên banner"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLink">
            <Form.Label>Liên kết</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPosition">
            <Form.Label>Vị trí</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập vị trí"
              value={position}
              min="0"
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Check
              type="checkbox"
              label="Trạng thái"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Ảnh</Form.Label>
            <Form.Control type="file" onChange={handleUploadImage} />
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="img-fluid mt-2"
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdateBanner}
          disabled={loading}
        >
          {loading ? "Loading..." : "Cập nhật"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateBanner;
