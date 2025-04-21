import { useParams } from "react-router-dom";
import "../../Admin/Blog/BLog.css";
import BlogAPI from "../../../api/BlogAPI";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const BlogDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const fetchDataBlog = async () => {
    try {
      const res = await BlogAPI.GetBlogBySlug(slug);
      if (res.status === 200) {
        setBlog(res.data.DT);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      const headingElements = [...document.querySelectorAll("h1, h2")];

      const headingsData = headingElements.map((el, index) => ({
        text: el.innerText,
        id: `heading-${index + 1}`,
        level: el.tagName.toLowerCase(),
      }));

      headingElements.forEach((el, index) => {
        el.id = `heading-${index + 1}`;
      });

      setHeadings(headingsData);
    }
  }, [blog]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let counterH1 = 0;
  let counterH2 = 0;
  return (
    <div>
      <h1>{blog?.title}</h1>
      <hr />
      <Row>
        <Col md={8} xs={12}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </Col>
        <Col className="d-none d-md-block " md={4}>
          <div style={{ position: "sticky", top: "90px" }}>
            <Card className="bg-white shadow-sm rounded ">
              <Card.Body>
                <Card.Title>Mục Lục</Card.Title>
                <ul className="list-group list-group-flush">
                  {headings.map((heading, index) => {
                    let displayText = heading.text;

                    if (heading.level === "h1") {
                      counterH1++;
                      counterH2 = 0;
                      displayText = `${counterH1}. ${heading.text}`;
                    } else if (heading.level === "h2") {
                      counterH2++;
                      displayText = `${counterH1}.${counterH2} ${heading.text}`;
                    }

                    return (
                      <li key={heading.id} className="list-group-item">
                        <a
                          href={`#${heading.id}`}
                          style={{
                            paddingLeft: heading.level === "h2" ? "20px" : "0px",
                            transition: "color 0.2s",
                            color: "#333",
                          }}
                          className={`text-decoration-none`}
                          onMouseEnter={(e) => (e.target.style.color = "#007bff")}
                          onMouseLeave={(e) => (e.target.style.color = "#333")}
                        >
                          {displayText}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BlogDetail;
