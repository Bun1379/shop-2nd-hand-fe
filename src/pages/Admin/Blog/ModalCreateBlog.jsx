import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadAPI from "../../../api/UploadAPI";
import "./Blog.css";
import BlogAPI from "../../../api/BlogAPI";
import { toast } from "react-toastify";

const ModalCreateBlog = ({
  show,
  setShow,
  fetchDataBlog,
  selectedBlog,
  setSelectedBlog,
}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const quillRef = useRef(null);

  const handleSubmit = async () => {
    if (!selectedBlog && !image) {
      toast.error("Vui lòng chọn ảnh cho bài viết");
      return;
    }
    if (!title || !content) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setIsLoadingSubmit(true);
    const formData = new FormData();
    try {
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        const uploadResponse = await UploadAPI.Upload(image);
        formData.append("image", uploadResponse.data.DT);
      }
      formData.append("status", status);
      let response;
      if (selectedBlog) {
        response = await BlogAPI.UpdateBlog(selectedBlog._id, formData);
      } else {
        response = await BlogAPI.CreateBlog(formData);
      }
      if (response.status === 200) {
        if (selectedBlog) {
          toast.success("Cập nhật Blog thành công");
        } else {
          toast.success("Thêm Blog thành công");
        }
        fetchDataBlog();
        handleClose();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.EM || "Có lỗi xảy ra");
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", async () => {
      const file = input.files[0];
      if (file) {
        setIsLoading(true);
        try {
          const response = await UploadAPI.Upload(file);
          const imageUrl = response.data.DT;

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });
    input.click();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "blockquote"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    []
  );

  const handleClose = () => {
    setShow(false);
    setContent("");
    setTitle("");
    setPreviewImage(null);
    setImage(null);
    setStatus(true);
    setIsLoading(false);
    setIsLoadingSubmit(false);
    setSelectedBlog(null);
    if (quillRef.current) {
      quillRef.current.getEditor().setContents([]);
    }
  };

  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
      setPreviewImage(selectedBlog.image);
      setStatus(selectedBlog.status);
    }
  }, [selectedBlog]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedBlog ? "Cập nhật Blog" : "Thêm blog"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tiêu đề"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-3">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
                {previewImage ? (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </div>
                ) : (
                  <Form.Text className="text-muted">
                    Chọn ảnh cho bài viết
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value={true}>Công khai</option>
                  <option value={false}>Riêng tư</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Nội dung</Form.Label>
            {isLoading && (
              <div className="text-center mb-2">
                <Spinner animation="border" role="status" />
                <p>Đang tải ảnh...</p>
              </div>
            )}
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={(value) => setContent(value)}
              theme="snow"
              modules={modules}
              readOnly={isLoading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoadingSubmit}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateBlog;
