import { useEffect, useState } from "react";
import ModalCreateBlog from "./ModalCreateBlog";
import BlogAPI from "../../../api/BlogAPI";
import BlogTable from "./BlogTable";
import ModalViewBlog from "./ModalViewBlog";

const ManageBlog = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isOpenViewBlog, setIsOpenViewBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchDataBlog = async () => {
    try {
      const res = await BlogAPI.GetBlog();
      if (res.status === 200) {
        setBlogs(res.data.DT);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenViewBlog = (blog) => {
    setSelectedBlog(blog);
    setIsOpenViewBlog(true);
  };

  const handleOpenUpdateBlog = (blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchDataBlog();
  }, []);

  return (
    <div className="p-4">
      <h1>Quản lý Blog</h1>
      <hr />
      <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
        Thêm Blog
      </button>
      <BlogTable
        blogs={blogs}
        handleOpenViewBlog={handleOpenViewBlog}
        handleOpenUpdateBlog={handleOpenUpdateBlog}
      />
      <ModalCreateBlog
        show={openModal}
        setShow={setOpenModal}
        fetchDataBlog={fetchDataBlog}
        selectedBlog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
      />
      <ModalViewBlog
        blog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
        show={isOpenViewBlog}
        setShow={setIsOpenViewBlog}
      />
    </div>
  );
};

export default ManageBlog;
