import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const DiscountTable = ({ discounts, setPage, totalPages }) => {
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <>
      <div>
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã giảm giá</th>
              <th>% giảm</th>
              <th>Ngày hết hạn</th>
              <th>GIới hạn sử dụng</th>
              <th>Đã sử dụng</th>
              <th>Loại mã giảm giá</th>
            </tr>
          </thead>
          <tbody>
            {discounts &&
              discounts.length > 0 &&
              discounts.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount.discountCode}</td>
                  <td>{discount.discountPercentage}</td>
                  <td>
                    {discount.expiredAt
                      ? new Date(discount.expiredAt).toLocaleDateString("vi-VN")
                      : "Không"}
                  </td>
                  <td>{discount.usageLimit ? discount.usageLimit : "Không"}</td>
                  <td>{discount.usersUsed.length}</td>
                  <td>
                    {discount.type === "SHIPPING"
                      ? "Giảm giá vận chuyển"
                      : "Giảm giá sản phẩm"}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </>
  );
};
export default DiscountTable;
