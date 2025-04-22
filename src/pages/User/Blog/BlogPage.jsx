import { useEffect, useState } from "react";
import BlogAPI from "../../../api/BlogAPI";
import BlogItem from "./BlogItem";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredBlogs(filteredBlogs);
  };

  useEffect(() => {
    fetchDataBlog();
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  return (
    <div>
      <h1 className="w-100 text-center text-uppercase mb-4 mt-5 bg-white border border-2 border-success rounded p-3">
        Blog thời trang
      </h1>
      {/* Search Form */}
      <Form onSubmit={handleSearchSubmit} className="mb-4 d-flex gap-2">
        <FormControl
          type="text"
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button type="submit" variant="outline-success">
          Tìm kiếm
        </Button>
      </Form>
      <Row>
        {filteredBlogs.map((blog) => (
          <Col key={blog._id} xs={12} sm={6} md={4} className="mb-4">
            <BlogItem key={blog._id} blog={blog} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
