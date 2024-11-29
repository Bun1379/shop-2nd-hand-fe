import React from "react";
import { Card, Image } from "react-bootstrap";

const OrderProductItem = ({ product, quantity }) => {
  return (
    <Card className="mb-3 p-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Hình ảnh và tên sản phẩm */}
        <div className="d-flex align-items-center">
          <Image
            src={product.images[0] || "https://via.placeholder.com/150"}
            alt={product.productName}
            rounded
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            className="me-3"
          />
          <div>
            <h6 className="fw-bold mb-1">{product.productName}</h6>
            <p className="text-muted mb-0">Phân loại: Size {product.size}</p>
          </div>
        </div>

        {/* Số lượng và thành tiền */}
        <div className="text-end">
          <p className="mb-1">
            Số lượng: <span className="fw-bold">{quantity}</span>
          </p>
          <p className="mb-0">
            Thành tiền:{" "}
            <span className="fw-bold text-success">
              {(product.price * quantity).toLocaleString("vi-VN")}₫
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OrderProductItem;
