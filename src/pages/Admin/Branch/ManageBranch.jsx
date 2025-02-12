import { useEffect, useState } from "react";
import BranchAPI from "../../../api/BranchAPI";
import BranchTable from "./BranchTable";
import ModelAddBranch from "./ModelAddBranch";

const ManageBranch = () => {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleAddBranch = () => {
    setBranch(null);
    setShow(true);
  };
  const handleEditBranch = (branch) => {
    setBranch(branch);
    setShow(true);
  };
  const fetchDataBranch = async () => {
    setLoading(true);
    try {
      const response = await BranchAPI.getAllBranches();
      setBranches(response.data.DT);
    } catch (error) {
      console.log("Lấy dữ liệu chi nhánh thất bại: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataBranch();
  }, []);
  return (
    <div className="p-4">
      <h1>Quản lý chi nhánh</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleAddBranch}>
        Thêm chi nhánh
      </button>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <BranchTable branches={branches} handleEditBranch={handleEditBranch} />
      <ModelAddBranch
        show={show}
        setShow={setShow}
        selectedBranch={branch}
        fetchDataBranch={fetchDataBranch}
      />
    </div>
  );
};

export default ManageBranch;
