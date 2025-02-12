import { toast } from "react-toastify";
import BranchStockAPI from "../../../api/BranchStockAPI";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const ModalShowBranchDistribution = ({ show, setShow, selectedProduct }) => {
  const [listBranch, setListBranch] = useState([]);
  const fetchDataAtEachBranch = async () => {
    try {
      const res = await BranchStockAPI.getBranchStockWithProduct(
        selectedProduct._id
      );
      console.log(res);
      if (res.status === 200) {
        setListBranch(res.data.DT);
      }
    } catch (err) {
      console.log(err.response.data.EM);
      toast.error("Lấy dữ liệu thất bại");
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (selectedProduct._id) fetchDataAtEachBranch();
  }, [selectedProduct]);
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
            {listBranch.length === 0 && (
              <tr>
                <td colSpan="2">
                  Sản phẩm không được phân phối ở chi nhánh nào
                </td>
              </tr>
            )}
            {listBranch.map((branch) => (
              <tr key={branch.branch._id}>
                <td>{branch.branch.address}</td>
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
