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
            <Form.Label>Color Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter color name"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalColor;
