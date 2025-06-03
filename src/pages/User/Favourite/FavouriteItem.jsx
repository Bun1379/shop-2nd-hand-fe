import { Card, Button, Image, Stack } from "react-bootstrap";
import { MdDetails } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Favourite = ({ product, handleRemoveFavourite }) => {
  const navigate = useNavigate();

  return (
    <Card className="my-3 shadow-lg border-1 p-2">
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="align-items-center">
          {/* Image */}
          <Image
            src={product.images[0]}
            alt={product.productName}
            rounded
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
            className="border border-1"
          />

          {/* Product Info */}
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-semibold">{product.productName}</h6>
            <p className="mb-0 text-muted">
              Giá: {product.price.toLocaleString("vi-VN")} đ
            </p>
          </div>

          {/* Actions */}
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                navigate("/product-detail", { state: { product } })
              }
            >
              Xem chi tiết
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleRemoveFavourite(product._id)}
            >
              Bỏ yêu thích
            </Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Favourite;
