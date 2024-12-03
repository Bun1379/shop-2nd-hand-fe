import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const ProductTable = ({
  products,
  page,
  setPage,
  totalPages,
  handleClickUpdate,
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
            <th>Giá</th>
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
                <td>{product.price}</td>
                <td className="d-flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClickUpdate(product)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
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
