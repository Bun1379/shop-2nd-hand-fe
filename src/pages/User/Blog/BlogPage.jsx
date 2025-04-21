import { useEffect, useState } from "react";
import BlogAPI from "../../../api/BlogAPI";
import BlogItem from "./BlogItem";
import { Col, Row } from "react-bootstrap";

const BlogPage = () => {
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

  useEffect(() => {
    fetchDataBlog();
  }, []);

  return (
    <div>
      <h1 className="w-100 text-center text-uppercase mb-4 mt-5 bg-white border border-2 border-success rounded p-3">
        Blog thời trang
      </h1>
      <Row>
        {blogs.map((blog) => (
          <Col key={blog._id} md={4} xs={12} className="mb-4">
            <BlogItem key={blog._id} blog={blog} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
