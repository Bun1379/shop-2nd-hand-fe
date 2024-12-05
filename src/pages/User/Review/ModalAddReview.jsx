import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const ModalAddReview = ({ show, setShow, handleSubmitReview, review }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (review.rating && review.comment) {
      setRating(review.rating);
      setComment(review.comment);
    }
    else {
      setRating(0);
      setComment("");
    }
  }, [review]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    handleSubmitReview({ rating, comment });
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleSubmit}>
          Gửi đánh giá
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddReview;
