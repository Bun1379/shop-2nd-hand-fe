import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const ModalAddReview = ({ show, setShow, handleSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
    setRating(0);
    setComment("");
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
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddReview;
