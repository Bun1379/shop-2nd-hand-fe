import { useEffect, useState } from "react";
import ModalCreateBlog from "./ModalCreateBlog";
import BlogAPI from "../../../api/BlogAPI";
import BlogTable from "./BlogTable";
import ModalViewBlog from "./ModalViewBlog";

const ManageBlog = () => {
  const [openCreateBlog, setOpenCreateBlog] = useState(false);
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

  useEffect(() => {
    fetchDataBlog();
  }, []);

  return (
    <div className="p-4">
      <h1>Quản lý Blog</h1>
      <hr />
      <button
        className="btn btn-primary"
        onClick={() => setOpenCreateBlog(true)}
      >
        Thêm Blog
      </button>
      <BlogTable blogs={blogs} handleOpenViewBlog={handleOpenViewBlog} />
      <ModalCreateBlog
        show={openCreateBlog}
        setShow={setOpenCreateBlog}
        fetchDataBlog={fetchDataBlog}
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
