import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import DiscountItem from "./DiscountItem";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]); // Danh sách tất cả discounts
  const [activeTab, setActiveTab] = useState("unused"); // Tab mặc định là 'Chưa sử dụng'
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
  const discountsPerPage = 6; // Số lượng discounts hiển thị mỗi trang
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchListDiscount = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      if (response.status === 200) {
        setDiscounts(response.data.DT.discounts); // Gán danh sách discounts từ API
      }
    } catch (error) {
      toast.error(error.response?.data?.EM || "Có lỗi xảy ra!");
    }
  };

  // Lọc danh sách discounts theo tab
  const filteredDiscounts =
    activeTab === "unused"
      ? discounts.filter(
        (discount) =>
          !discount.usersUsed.includes(user._id) &&
          (!discount.expiredAt || new Date(discount.expiredAt) >= new Date())
      )
      : discounts.filter(
        (discount) =>
          discount.usersUsed.includes(user._id) ||
          (discount.expiredAt && new Date(discount.expiredAt) < new Date())
      );
  // Tính toán chỉ mục bắt đầu và kết thúc của danh sách trên trang hiện tại
  const indexOfLastDiscount = (currentPage + 1) * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = filteredDiscounts.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredDiscounts.length / discountsPerPage);

  useEffect(() => {
    fetchListDiscount();
    setCurrentPage(0); // Reset trang về 0 khi chuyển tab
  }, [activeTab]);

  // Hàm xử lý sự kiện khi thay đổi trang
  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Cập nhật trang hiện tại
  };

  return (
    <div>
      <h1 className="text-center">Túi Discount</h1>

      {/* Tabs */}
      <div className="nav nav-tabs bg-white mb-2" id="discountTabs" role="tablist">
        <li className="nav-item w-50" role="presentation">
          <button
            className={`w-100 nav-link ${activeTab === "unused" ? "active text-white bg-success" : "text-dark"
              }`}
            id="unused-tab"
            onClick={() => setActiveTab("unused")}
            type="button"
          >
            Còn hiệu lực
          </button>
        </li>
        <li className="nav-item w-50" role="presentation">
          <button
            className={`w-100 nav-link ${activeTab === "used" ? "active text-white bg-success" : "text-dark"
              }`}
            id="used-tab"
            onClick={() => setActiveTab("used")}
            type="button"
          >
            Hết hiệu lực
          </button>
        </li>
      </div>

      {/* Nội dung */}
      {currentDiscounts.length === 0 ? (
        <p className="text-center text-primary">Không có giảm giá</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-between">
          {currentDiscounts.map((discount) => (
            <DiscountItem discount={discount} key={discount._id} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredDiscounts.length > 0 && filteredDiscounts.length > discountsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            pageCount={totalPages}
            onPageChange={handlePageClick}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            pageRangeDisplayed={5}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Discount;
