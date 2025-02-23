import { useState } from "react";
import { Modal, Toast } from "react-bootstrap";
import DiscountAPI from "../../../api/DiscountAPI";
import { toast } from "react-toastify";

const ModalAddDiscount = ({ show, setShow }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiredAt, setExpiredAt] = useState(null);
  const [usageLimit, setUsageLimit] = useState(null);

  const handleClose = () => {
    setShow(false);
    setCode("");
    setDiscount(0);
    setExpiredAt(null);
    setUsageLimit(null);
  };

  const handleAddDiscount = async () => {
    if (!code || !discount) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (discount < 0 || discount > 100) {
      toast.error("Vui lòng nhập % giảm giá hợp lệ");
      return;
    }
    try {
      const response = await DiscountAPI.createDiscount({
        discountCode: code,
        discountPercentage: discount,
        expiredAt,
        usageLimit,
      });
      if (response.status === 200) {
        toast.success("Add discount successfully");
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mã giảm giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="code">Mã giảm giá</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập mã giảm giá"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Giảm giá(%)</label>
          <input
            type="number"
            className="form-control"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiredAt">Ngày hết hạn</label>
          <input
            type="date"
            className="form-control"
            id="expiredAt"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usageLimit">Số lượng sử dụng (optional)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Nhập số lượng sử dụng"
            id="usageLimit"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Đóng
        </button>
        <button className="btn btn-primary" onClick={handleAddDiscount}>
          Thêm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddDiscount;
