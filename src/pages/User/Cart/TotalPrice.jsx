import { Button, Card } from "react-bootstrap";

const TotalPrice = ({ total, handleCheckOut, totalProduct }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <Card.Title className="fw-bold fs-4">Tổng đơn hàng</Card.Title>
        <Card.Text className="mb-2">
          <strong>Tổng sản phẩm: {totalProduct}</strong>
        </Card.Text>
        <Card.Text className="fw-bold">
          Tổng thanh toán: {total.toLocaleString("vi-VN")} đ
        </Card.Text>

        <Button variant="success" onClick={handleCheckOut} className="w-100">
          Thanh toán
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TotalPrice;
