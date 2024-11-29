import { Card, Row, Col, Button, Image } from "react-bootstrap";

const FavouriteItem = ({ product, handleRemoveFavourite }) => {
  return (
    <Card className="my-3 shadow-sm border-0">
      <Card.Body className="d-flex justify-content-between align-items-center">
        {/* Image */}
        <div className="d-flex align-items-center">
          <Image
            src={product.images[0]}
            alt={product.productName}
            rounded
            fluid
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          {/* Product details */}
          <div className="ms-3">
            <p className="fw-bold mb-0">{product.productName}</p>
            <p className="text-muted mb-0">
              Giá: {product.price.toLocaleString("vi-VN")} VND
            </p>
          </div>
        </div>

        {/* Remove button */}
        <Col xs={3} className="text-end">
          <Button
            variant="danger"
            onClick={() => handleRemoveFavourite(product._id)}
          >
            Bỏ yêu thích
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default FavouriteItem;
