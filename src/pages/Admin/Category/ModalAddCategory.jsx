import { Button, Form, Modal } from "react-bootstrap";
import CategoryAPI from "../../../api/CategoryAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ModalAddCategory = ({
  show,
  setShow,
  fetchDataCategory,
  selectedCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name || "");
    } else {
      setCategoryName("");
    }
  }, [selectedCategory, show]);

  const handleClose = () => {
    setCategoryName("");
    setShow(false);
  };

  const handleSave = async () => {
    if (!categoryName) {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }
    try {
      let response;
      if (selectedCategory) {
        response = await CategoryAPI.updateCategory(selectedCategory._id, {
          name: categoryName,
        });
      } else {
        response = await CategoryAPI.createCategory({ name: categoryName });
      }

      if (response.status === 200) {
        toast.success(
          selectedCategory
            ? "Cập nhật danh mục thành công"
            : "Thêm danh mục thành công"
        );
        fetchDataCategory();
        handleClose();
      }
    } catch (error) {
      toast.error(
        selectedCategory
          ? "Cập nhật danh mục thất bại"
          : "Thêm danh mục thất bại"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên danh mục"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddCategory;
