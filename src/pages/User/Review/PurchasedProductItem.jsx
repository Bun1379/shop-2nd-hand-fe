import { Card, Row, Col, Button, Image } from "react-bootstrap";

const PurchasedProductItem = ({ product, handleShowReviewModal }) => {
  return (
    <Card className="my-3 shadow-lg">
      <Card.Body className="d-flex justify-content-between align-items-center">
        {/* Left side - Image and Product Name */}
        <div className="d-flex align-items-center">
          <Image
            src={product.images[0] || "https://via.placeholder.com/150"}
            alt="product"
            rounded
            fluid
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <h5 className="mb-0">{product.productName}</h5>
            <p className="mb-0 text-muted">Phân loại: Size {product.size}</p>
          </div>
        </div>

        {/* Right side - Review Button */}
        <Button variant="danger" onClick={() => handleShowReviewModal(product)}>
          Đánh giá
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PurchasedProductItem;
