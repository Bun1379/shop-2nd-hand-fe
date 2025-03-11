import { useEffect, useState } from "react";
import BranchAPI from "../../../api/BranchAPI";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import BranchStockAPI from "../../../api/BranchStockAPI";

const ModalAddBranchStock = ({ show, setShow, selectedProduct }) => {
  const [listBranch, setListBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const fetchDataBranch = async () => {
    try {
      const res = await BranchAPI.getAllBranches();
      if (res.status === 200) {
        setListBranch(
          res.data.DT.map((branch) => ({
            value: branch._id,
            label: branch.name,
          }))
        );
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };
  const handleSave = async () => {
    try {
      const res = await BranchStockAPI.updateBranchStock(
        selectedBranch.value,
        selectedProduct._id,
        { quantity }
      );
      if (res.status === 200) {
        setShow(false);
        toast.success("Phân phối sản phẩm thành công");
      }
    } catch (err) {
      console.log(err.response.data.EM);
      toast.error("Phân phối sản phẩm thất bại");
    }
  };
  const handleClose = () => {
    setQuantity(0);
    setShow(false);
  };
  useEffect(() => {
    fetchDataBranch();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Phân phối sản phẩm tới chi nhánh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div>
            <label>Chi nhánh</label>
            <Select
              options={listBranch}
              value={selectedBranch}
              onChange={(selectedOption) => setSelectedBranch(selectedOption)}
            />
          </div>
          <div className="form-group mt-2">
            <label>Số lượng nhập vào</label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập số lượng"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
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

export default ModalAddBranchStock;
