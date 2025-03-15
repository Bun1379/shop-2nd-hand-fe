import { Table } from "react-bootstrap";

const BranchTable = ({ branches, handleEditBranch }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Mã chi nhánh</th>
          <th>Tên chi nhánh</th>
          <th>Địa chỉ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {branches &&
          branches.length > 0 &&
          branches.map((branch) => (
            <tr key={branch._id}>
              <td>{branch._id}</td>
              <td>{branch.name}</td>
              <td>{branch.address}</td>
              <td className="d-flex gap-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditBranch(branch)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default BranchTable;
