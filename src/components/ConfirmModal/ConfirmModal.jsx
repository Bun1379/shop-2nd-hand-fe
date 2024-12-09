import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConfirm = ({ show, onClose, text, onConfirm }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirm;
