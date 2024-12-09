import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import UserTable from "./UserTable";
import { Modal } from "react-bootstrap";
import ModalUpdateUser from "./ModalUpdateUser";

const User = () => {
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
