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
      <h1>Blog Page</h1>
      <hr />
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
