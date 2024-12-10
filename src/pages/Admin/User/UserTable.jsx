import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const UserTable = ({
  users,
  setPage,
  totalPages,
  handleUpdateUser,
}) => {
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
              <th>STT</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.is_admin ? "ADMIN" : "USER"}</td>
                  <td>{user.is_active ? "Active" : "Block"}</td>
                  <td className="d-flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateUser(user)}
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

export default UserTable;
