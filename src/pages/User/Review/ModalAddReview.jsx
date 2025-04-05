import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import UploadAPI from "../../../api/UploadAPI";
import { toast } from "react-toastify";

const ModalAddReview = ({
  show,
  setShow,
  handleSubmitReview,
  review,
  setReview,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setImages(review.images || []);
    }
  }, [review]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    handleSubmitReview({ rating, comment, images });
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setImages([]);
    setLoadingImage(false);
    setReview(null);
    setShow(false);
  };

  const handleUploadImage = async (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setLoadingImage(true);
      const file = event.target.files[0];
      const validImageTypes = ["image/jpeg", "image/png"];

      if (!validImageTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận các tệp ảnh có định dạng JPG hoặc PNG");
        setLoadingImage(false);
        return;
      }
      const response = await UploadAPI.Upload(file);
      if (response.status === 200) {
        setImages((prevImages) => [...prevImages, response.data.DT]);
      } else {
        toast.error("Lỗi khi tải lên ảnh");
      }
      setLoadingImage(false);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm đánh giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Rating value={rating} onChange={setRating} />
        <textarea
          className="form-control"
          label="Comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="mt-2">
          <label
            className="form-label label-upload btn btn-primary"
            htmlFor="labelUpload"
          >
            Tải ảnh lên
          </label>
          <input
            id="labelUpload"
            hidden
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            disabled={loadingImage}
          />
          {loadingImage && <span>Đang tải ảnh lên...</span>}
          {images.length > 0 && (
            <div className="mt-2">
              {images.map((image, index) => (
                <img
                  className="rounded"
                  key={index}
                  src={image}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                  onClick={() => handleDeleteImage(index)}
                />
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleSubmit}>Gửi đánh giá</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddReview;
