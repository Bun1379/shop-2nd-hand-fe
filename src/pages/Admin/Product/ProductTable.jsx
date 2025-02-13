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
}) => {
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <div>
      {" "}
      Product Table
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá gốc</th>
            <th>Giá bán</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.original_price.toLocaleString("vi-VN")} đ</td>
                <td>{product.price.toLocaleString("vi-VN")} đ</td>
                <td className="d-flex gap-3">
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
    </div>
  );
};
export default ProductTable;
