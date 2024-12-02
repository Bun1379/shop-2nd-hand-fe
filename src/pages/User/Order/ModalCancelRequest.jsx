import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import "@smastrom/react-rating/style.css";

const ModalCancelRequest = ({ show, setShow, handleSubmitCancelOrder }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    handleSubmitCancelOrder({ reason: comment });
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setComment("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Gửi yêu cầu hủy đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          label="Comment"
          value={comment}
          onChange={handleCommentChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelRequest;
