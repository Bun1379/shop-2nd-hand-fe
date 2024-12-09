import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import UploadAPI from "../../../api/UploadAPI";
import BannerAPI from "../../../api/BannerAPI";

const ModalAddBanner = ({ showAdd, setShowAdd, fetchDataBanner }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleClose = () => {
    setShowAdd(false);
    setTitle("");
    setLink("");
    setPosition(0);
    setPreviewImage("");
    setImage(null);
  };

  const handleAddBanner = async () => {
    setLoading(true);
    if (position < 0) {
      toast.error("Vị trí không được nhỏ hơn 0");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("url", link);
      formData.append("position", position);

      if (image) {
        const uploadResponse = await UploadAPI.Upload(image);
        formData.append("image", uploadResponse.data.DT);
      }

      const response = await BannerAPI.AddBanner(formData);
      if (response.status === 200) {
        toast.success("Thêm banner thành công");
        fetchDataBanner();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.EM || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={showAdd} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Banner Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Liên kết</label>
            <input
              type="text"
              className="form-control"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Vị trí</label>
            <input
              type="number"
              className="form-control"
              id="position"
              value={position}
              min="0"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              className="form-label label-upload btn btn-primary"
              htmlFor="labelUpload"
            >
              Upload hình ảnh
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              onChange={handleUploadImage}
            />
          </div>
          <div className="form-group">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={handleAddBanner}
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddBanner;
