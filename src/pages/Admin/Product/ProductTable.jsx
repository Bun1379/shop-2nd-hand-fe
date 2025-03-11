import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const ProductTable = ({
  products,
  page,
  setPage,
  totalPages,
  handleClickUpdate,
  handleDistribution,
  handleShowBranchStockOfProduct,
  selectedBranch,
}) => {
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá gốc</th>
            <th>Giá bán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => (

              <tr
                key={product._id}
                className={`${(selectedBranch.value !== 0
                  ? product.stock.find((stock) => stock.branch._id === selectedBranch.value)?.quantity
                  : product.quantity) === 0
                  ? "table-danger"
                  : (selectedBranch.value !== 0
                    ? product.stock.find((stock) => stock.branch._id === selectedBranch.value)?.quantity
                    : product.quantity) < 10
                    ? "table-warning"
                    : ""
                  }`}
              >

                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>
                  {selectedBranch.value !== 0
                    ? product.stock.find(
                      (stock) => stock.branch._id === selectedBranch.value
                    )?.quantity || 0
                    : product.quantity}
                </td>
                <td>{product.original_price.toLocaleString("vi-VN")} đ</td>
                <td>{product.price.toLocaleString("vi-VN")} đ</td>
                <td className="d-flex gap-3">
                  {user.is_admin && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleClickUpdate(product)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDistribution(product)}
                      >
                        Phân phối
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShowBranchStockOfProduct(product)}
                  >
                    Xem kho
                  </button>
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
    </div >
  );
};
export default ProductTable;