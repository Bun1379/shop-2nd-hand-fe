import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import UserTable from "./UserTable";
import { Modal } from "react-bootstrap";
import ModalUpdateUser from "./ModalUpdateUser";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "admin";
  if (!isAdmin) {
    toast.error("Bạn không có quyền truy cập vào trang này");
    return <Navigate to="/admin" />;
  }
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const handleUpdateUser = (user) => {
    setDataUpdate(user);
    setShowUpdate(true);
  };

  const fetchDataUser = async () => {
    try {
      const res = await UserAPI.GetUserAdmin({ page });
      if (res.status === 200) {
        setUsers(res.data.DT.users);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [page, showUpdate]);

  return (
    <div className="p-4">
      <h1>Quản lý người dùng</h1>
      <UserTable
        users={users}
        setPage={setPage}
        totalPages={totalPages}
        handleUpdateUser={handleUpdateUser}
      />
      <ModalUpdateUser
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
        user={dataUpdate}
      />
    </div>
  );
};
export default User;
