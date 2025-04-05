import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewedProductItem = ({ review, handleShowReviewModal }) => {
  return (
    <Card className="my-3 shadow-sm border-0">
      <Card.Body>
        <Row>
          {/* Hình ảnh và thông tin sản phẩm */}
          <Col xs={12} className="d-flex align-items-center mb-3">
            <Image
              src={
                review.product.images[0] || "https://via.placeholder.com/150"
              }
              alt="product"
              rounded
              fluid
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div className="ms-3">
              <h5 className="mb-1">{review.product.productName}</h5>
              <p className="mb-1 text-muted">
                Phân loại: Size {review.product.size}
              </p>
            </div>
          </Col>
          <hr style={{ borderTop: "2px solid #ccc" }} />
          {/* Phần đánh giá */}
          <Col xs={12}>
            <div className="mb-2">
              <p className="mt-1 mb-1 text-muted">
                {new Date(review.createdAt).toLocaleString("vi-VN")}
              </p>
              <Rating
                value={review.rating}
                readOnly
                style={{ maxWidth: 120 }}
              />
              <p className="mt-1 mb-1 text-muted">{review.comment}</p>
            </div>
            {review.images.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-2">
                {review.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    rounded
                    onClick={() => window.open(image, "_blank")}
                  />
                ))}
              </div>
            )}
            <hr style={{ borderTop: "2px solid #ccc" }} />
            {/* Nút chỉnh sửa */}
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleShowReviewModal(review)}
            >
              Chỉnh sửa
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReviewedProductItem;
