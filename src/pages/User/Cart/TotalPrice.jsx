import { Button, Card } from "react-bootstrap";

const TotalPrice = ({ total, handleCheckOut, totalProduct }) => {
  return (
    <Card
      className="position-fixed top-0 end-0 shadow-lg"
      style={{
        height: "220px",
        marginTop: "110px",
        width: "300px",
        marginRight: "80px",
      }}
    >
      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <Card.Title className="fw-bold fs-4">Tổng đơn hàng</Card.Title>
        <Card.Text className="mb-2">
          <strong>Tổng sản phẩm: {totalProduct}</strong>
        </Card.Text>
        <Card.Text className="fw-bold">Tổng thanh toán: {total.toLocaleString("vi-VN")} đ</Card.Text>

        <Button variant="success" onClick={handleCheckOut} className="w-100">
          Thanh toán
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TotalPrice;
