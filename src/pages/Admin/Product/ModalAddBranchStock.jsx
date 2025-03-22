import { useEffect, useState } from "react";
import BranchAPI from "../../../api/BranchAPI";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import BranchStockAPI from "../../../api/BranchStockAPI";
import ProductAPI from "../../../api/ProductAPI";

const ModalAddBranchStock = ({
  show,
  setShow,
  selectedProduct,
  fetchDataProduct,
}) => {
  const [listBranch, setListBranch] = useState([]);
  const [dataEachBranch, setDataEachBranch] = useState([]);
  const [branchStockUpdates, setBranchStockUpdates] = useState({});

  const handleChangeQuantity = (branchId, type, value) => {
    setBranchStockUpdates((prev) => ({
      ...prev,
      [branchId]: {
        ...prev[branchId],
        [type]: value ? Math.max(0, Number(value)) : 0,
      },
    }));
  };
  const fetchDataAtEachBranch = async () => {
    try {
      const res = await BranchStockAPI.getBranchStockWithProduct(
        selectedProduct?._id
      );
      if (res.status === 200) {
        setDataEachBranch(res.data.DT);
      }
    } catch (err) {
      console.log(err.response.data.EM);
      toast.error("Lấy dữ liệu thất bại");
    }
  };

  const fetchDataBranch = async () => {
    try {
      const res = await BranchAPI.getAllBranches();
      if (res.status === 200) {
        setListBranch([{ name: "Kho chính", _id: "main" }, ...res.data.DT]);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };

  const handleSave = async () => {
    let totalIncrease = 0;
    let totalDecrease = 0;

    Object.values(branchStockUpdates).forEach(
      ({ increase = 0, decrease = 0 }) => {
        totalIncrease += increase;
        totalDecrease += decrease;
      }
    );

    if (totalIncrease !== totalDecrease) {
      toast.error("Tổng số hàng nhập phải bằng tổng số hàng xuất!");
      return;
    }
    try {
      const sortedUpdates = Object.entries(branchStockUpdates).sort(
        ([, a], [, b]) => {
          const aHasDecrease = a.decrease > 0 ? -1 : 1;
          const bHasDecrease = b.decrease > 0 ? -1 : 1;
          return aHasDecrease - bHasDecrease;
        }
      );
      //preCheck
      for (const [branchId, updates] of sortedUpdates) {
        const { increase = 0, decrease = 0 } = updates;
        const quantity = increase - decrease;
        if (branchId === "main") {
          if (quantity < 0) {
            if (selectedProduct?.quantity < Math.abs(quantity)) {
              toast.error("Kho chính không đủ hàng để xuất ra!");
              return;
            }
          }
        } else {
          if (quantity < 0) {
            const res =
              await BranchStockAPI.getBranchStocksWithBranchAndProduct(
                branchId,
                selectedProduct?._id
              );
            if (!res.data.DT || res.data.DT.quantity < Math.abs(quantity)) {
              toast.error("Chi nhánh không đủ hàng để xuất ra!");
              return;
            }
          }
        }
      }
      //
      for (const [branchId, updates] of sortedUpdates) {
        const { increase = 0, decrease = 0 } = updates;
        const quantity = increase - decrease;
        if (branchId === "main") {
          if (increase !== decrease) {
            await ProductAPI.UpdateProduct(selectedProduct?._id, {
              quantity: selectedProduct?.quantity + quantity,
            });
          }
        } else if (increase !== decrease) {
          await BranchStockAPI.updateBranchStock(
            branchId,
            selectedProduct?._id,
            {
              quantity: Math.abs(quantity),
              type: quantity > 0 ? "increase" : "decrease",
            }
          );
        }
      }
      toast.success("Cập nhật kho thành công!");
      if (fetchDataProduct !== undefined)
        fetchDataProduct();
      setBranchStockUpdates({});
      setShow(false);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.EM);
      toast.error(err.response.data.EM);
    }
  };

  const handleClose = () => {
    setBranchStockUpdates({});
    setShow(false);
  };

  useEffect(() => {
    fetchDataBranch();
  }, []);

  useEffect(() => {
    if (selectedProduct?._id) fetchDataAtEachBranch();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      backdropClassName="modal-backdrop-dark"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2000,
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Phân phối sản phẩm tới chi nhánh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Table striped bordered hover className="text-center" >
            <thead>
              <tr>
                <th>Chi nhánh</th>
                <th>Số lượng</th>
                <th>Xuất ra</th>
                <th>Nhập vào</th>
              </tr>
            </thead>
            <tbody>
              {listBranch?.map((branch) => (
                <tr key={branch._id}>
                  <td>{branch.name}</td>
                  <td>
                    {branch._id === "main"
                      ? selectedProduct?.quantity
                      : dataEachBranch.find(
                        (item) => item.branch._id === branch._id
                      )?.quantity || 0}
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={branchStockUpdates[branch._id]?.decrease || ""}
                      onChange={(e) =>
                        handleChangeQuantity(
                          branch._id,
                          "decrease",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={branchStockUpdates[branch._id]?.increase || ""}
                      onChange={(e) =>
                        handleChangeQuantity(
                          branch._id,
                          "increase",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
