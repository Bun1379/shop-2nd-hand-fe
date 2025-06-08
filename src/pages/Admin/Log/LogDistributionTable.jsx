import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const LogTable = ({ logs, setPage, totalPages }) => {
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
              <th>Người phân phối</th>
              <th>Sản phẩm</th>
              <th>Chi nhánh</th>
              <th>Số lượng</th>
              <th>Hành động</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.length > 0 &&
              logs.map((log) => (
                <tr key={log._id}>
                  <td>{log.user.username}</td>
                  <td>{log.product.productName}</td>
                  <td>{log.branch ? log.branch.name : "Kho chính"}</td>
                  <td>{log.quantity}</td>
                  <td>
                    {log.action === "ADD"
                      ? "Nhập hàng vào"
                      : log.action === "REMOVE"
                        ? "Xuất hàng ra"
                        : "Cập nhật hàng"}
                  </td>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
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
export default LogTable;
