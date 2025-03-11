import { toast } from "react-toastify";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const ModalShowBranchDistribution = ({ show, setShow, selectedProduct }) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết phân phối sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chi nhánh</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.stock?.length === 0 && (
              <tr>
                <td colSpan="2">
                  Sản phẩm không được phân phối ở chi nhánh nào
                </td>
              </tr>
            )}
            {selectedProduct.stock?.map((branch) => (
              <tr key={branch.branch._id}>
                <td>{branch.branch.name}</td>
                <td>{branch.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalShowBranchDistribution;
