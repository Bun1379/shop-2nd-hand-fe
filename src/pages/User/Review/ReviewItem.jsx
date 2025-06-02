import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const ReviewItem = ({ review }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? review.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === review.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="d-flex flex-row gap-3 border rounded shadow-sm p-3  w-100 my-3 bg-light">
      <img
        src={review.user.image}
        className="rounded-circle border border-2"
        style={{ width: "75px", height: "75px", objectFit: "cover" }}
        alt={`${review.user.username}'s avatar`}
      />
      <div className="d-flex flex-column gap-1 w-100">
        <span className="fw-bold text-primary">{review.user.username}</span>
        <div className="d-flex align-items-center">
          <Rating value={review.rating} readOnly style={{ width: "10%" }} />
          <small className="text-muted ms-2">{review.rating}/5</small>
        </div>
        <span>{review.comment}</span>
        {review.images.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                className="rounded"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}
        <span className="text-end text-muted" style={{ fontSize: "0.9rem" }}>
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="image-modal"
      >
        <Modal.Body className="p-0 position-relative">
          <div className="position-relative">
            <img
              src={review.images[selectedImageIndex]}
              alt="Selected review image"
              style={{ width: "100%", height: "auto", maxHeight: "70vh" }}
              className="rounded"
            />

            {/* Navigation Arrows */}
            <button
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2"
              onClick={handlePrevious}
              style={{ opacity: 0.8 }}
            >
              &lt;
            </button>
            <button
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={handleNext}
              style={{ opacity: 0.8 }}
            >
              &gt;
            </button>
          </div>

          {/* Thumbnail List */}
          <div className="d-flex gap-2 p-2 overflow-auto" style={{ maxWidth: "100%" }}>
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: selectedImageIndex === index ? "3px solid #0d6efd" : "1px solid #dee2e6",
                }}
                className="rounded"
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ReviewItem;
