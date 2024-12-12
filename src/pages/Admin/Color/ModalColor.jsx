import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ColorAPI from "../../../api/ColorAPI";
import { toast } from "react-toastify";

const ModalColor = ({ show, setShow, fetchDataColor, selectedColor }) => {
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    if (selectedColor) {
      setColorName(selectedColor.name || "");
    } else {
      setColorName("");
    }
  }, [selectedColor, show]);

  const handleClose = () => {
    setColorName("");
    setShow(false);
  };

  const handleSave = async () => {
    if (!colorName) {
      toast.error("Vui lòng nhập tên màu");
      return;
    }
    try {
      let response;
      if (selectedColor) {
        response = await ColorAPI.UpdateColor(selectedColor._id, {
          name: colorName,
        });
      } else {
        response = await ColorAPI.CreateColor({ name: colorName });
      }

      if (response.status === 200) {
        toast.success(
          selectedColor ? "Cập nhật màu thành công" : "Thêm màu thành công"
        );
        fetchDataColor();
        handleClose();
      }
    } catch (error) {
      toast.error(
        selectedColor ? "Cập nhật màu thất bại" : "Thêm màu thất bại"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedColor ? "Cập nhật màu" : "Thêm màu"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên màu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên màu"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
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

export default ModalColor;
