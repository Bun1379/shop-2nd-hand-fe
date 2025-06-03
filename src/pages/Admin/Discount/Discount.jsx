import { useEffect, useState } from "react";
import DiscountAPI from "../../../api/DiscountAPI";
import DiscountTable from "./DiscountTable";
import ModalAddDiscount from "./ModalAddDiscount";
import Select from "react-select";
import { Accordion } from "react-bootstrap";

const Discount = () => {
  const type = [
    {
      value: "SHIPPING",
      label: "Giảm giá vận chuyển",
    },
    {
      value: "PRODUCT",
      label: "Giảm giá sản phẩm",
    },
  ];
  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");

  const fetchDataDiscount = async () => {
    try {
      const res = await DiscountAPI.getDiscounts({
        page,
        type: typeFilter.value,
      });
      if (res.status === 200) {
        setDiscounts(res.data.DT.discounts);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };

  const onClickSearch = () => {
    if (page !== 1) setPage(1);
    fetchDataDiscount();
  };

  const handleResetButton = () => {
    setTypeFilter("");
    fetchDataDiscount();
  };

  useEffect(() => {
    fetchDataDiscount();
  }, [page, showAddDiscount]);

  return (
    <div className="p-4">
      <h1>Quản lý mã giảm giá</h1>
      <button
        className="btn btn-primary mb-2"
        onClick={() => setShowAddDiscount(true)}
      >
        Thêm mã giảm giá
      </button>

      <Accordion className="my-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc tìm kiếm</Accordion.Header>
          <Accordion.Body>
            {/* Nhập số lượng, giá */}
            <div className="d-flex flex-row gap-3 my-2">
              <Select
                options={type}
                value={typeFilter}
                onChange={setTypeFilter}
                placeholder="Lọc theo loại mã giảm giá"
              />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-primary" onClick={onClickSearch}>
                Tìm kiếm
              </button>
              <button className="btn btn-primary" onClick={handleResetButton}>
                Làm mới
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <DiscountTable
        discounts={discounts}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        // handleClickUpdate={handleClickUpdate}
      />
      <ModalAddDiscount show={showAddDiscount} setShow={setShowAddDiscount} />
    </div>
  );
};

export default Discount;
