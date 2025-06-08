import { Button, Modal } from "react-bootstrap";
import "./Blog.css";
const ModalViewBlog = ({ blog, show, setShow, setSelectedBlog }) => {
  const handleClose = () => {
    setShow(false);
    setSelectedBlog(null);
  };
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{blog?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewBlog;
