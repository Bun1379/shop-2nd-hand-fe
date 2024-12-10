import { useEffect, useState } from "react";
import DiscountAPI from "../../../api/DiscountAPI";
import DiscountTable from "./DiscountTable";
import ModalAddDiscount from "./ModalAddDiscount";

const Discount = () => {
  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateDiscount, setShowUpdateDiscount] = useState(false);

  const fetchDataDiscount = async () => {
    try {
      const res = await DiscountAPI.getDiscounts({ page });
      if (res.status === 200) {
        setDiscounts(res.data.DT.discounts);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
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
