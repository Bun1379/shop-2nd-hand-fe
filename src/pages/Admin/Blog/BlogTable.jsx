import { Button, Table } from "react-bootstrap";

const BlogTable = ({ blogs, handleOpenViewBlog, handleOpenUpdateBlog }) => {
  return (
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Image</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog._id}>
            <td>{blog.title}</td>
            <td>
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  height: "50px",
                }}
              />
            </td>
            <td>{blog.status ? "Đang hoạt động" : "Đã tắt"}</td>
            <td>
              {new Date(blog.createdAt).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
              })}
            </td>
            <td>
              <Button onClick={() => handleOpenViewBlog(blog)}>Xem</Button>
              <Button
                className="mx-2"
                onClick={() => handleOpenUpdateBlog(blog)}
              >
                Sửa
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogTable;
