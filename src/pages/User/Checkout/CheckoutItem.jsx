import { Row, Col, Image, Card } from "react-bootstrap";

const CheckoutItem = ({ item }) => {
  console.log(item);
  return (
    <Card className="shadow border-0 mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={1}>
            <Image
              src={item.product.images[0] || "https://via.placeholder.com/50"}
              alt="product"
              rounded
              fluid
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={5} className="fw-bold">
            {item.product.productName}
          </Col>
          <Col xs={1} className="text-muted">
            {item.product.size}
          </Col>
          <Col xs={2} className="text-center">
            {
              item.priceAtCreate ? (
                <span>{item.priceAtCreate.toLocaleString("vi-VN")} đ</span>
              ) : (
                <span>{item.product.price.toLocaleString("vi-VN")} đ</span>
              )
            }
          </Col>
          <Col xs={1} className="text-center">
            x{item.quantity}
          </Col>
          <Col xs={2} className="text-end fw-bold">
            {
              item.priceAtCreate ? (
                <span>{(item.priceAtCreate * item.quantity).toLocaleString("vi-VN")} đ</span>
              ) : (
                <span>{(item.product.price * item.quantity).toLocaleString("vi-VN")} đ</span>
              )
            }
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CheckoutItem;
