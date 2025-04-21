import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: isHovered ? "translateY(-10px)" : "translateY(0)",
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
      className="bg-dark text-white"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/blog/${blog.slug}`)}
    >
      <Card.Img variant="top" src={blog.image} height="200" />
      <Card.ImgOverlay
        className="d-flex flex-column justify-content-end"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Title className="font-weight-bold">{blog.title}</Card.Title>
        <Card.Text className="text-truncate">
          {truncateContent(blog.content)}
        </Card.Text>
        <Card.Text className="small">Cập nhật vào: {new Date(blog.updatedAt).toLocaleString("VN")}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default BlogItem;
