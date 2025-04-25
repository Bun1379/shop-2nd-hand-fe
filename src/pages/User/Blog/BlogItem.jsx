import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "none",
    cursor: "pointer",
  };
  const truncateContent = (content, length = 50) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const textContent = doc.body.textContent || doc.body.innerText;

    return textContent.length > length
      ? textContent.substring(0, length) + "..."
      : textContent;
  };
  return (
    <Card
      className="bg-dark text-white border-0 shadow-sm position-relative"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/blog/${blog.slug}`)}
    >
      <Card.Img
        variant="top"
        src={blog.image}
        height="200"
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />

      {/* Overlay with smooth transition */}
      <Card.ImgOverlay className="d-flex flex-column justify-content-end p-3">
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            padding: "10px",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          <Card.Title className="font-weight-bold text-uppercase mb-2">
            {blog.title}
          </Card.Title>

          <Card.Text className="text-truncate" style={{ lineHeight: "1.4" }}>
            {truncateContent(blog.content)}
          </Card.Text>

          <Card.Text className="small">
            <span className="badge bg-success text-white">
              Cập nhật vào: {new Date(blog.updatedAt).toLocaleString("VN")}
            </span>
          </Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default BlogItem;
