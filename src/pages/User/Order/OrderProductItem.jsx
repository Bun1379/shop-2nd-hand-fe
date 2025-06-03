import React from "react";
import { Card, Image } from "react-bootstrap";

const OrderProductItem = ({ item }) => {
  return (
    <Card className="mb-3 p-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Hình ảnh và tên sản phẩm */}
        <div className="d-flex align-items-center">
          <Image
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            rounded
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
            className="me-3"
          />
          <div>
            <h6 className="fw-bold mb-1">{item.name}</h6>
            <p className="text-muted mb-0">Phân loại: Size {item.size}</p>
          </div>
        </div>

        {/* Số lượng và thành tiền */}
        <div className="text-end">
          <p className="mb-1">
            Số lượng: <span className="fw-bold">{item.quantity}</span>
          </p>
          <p className="mb-0">
            Thành tiền:{" "}
            <span className="fw-bold text-success">
              {item.priceAtCreate ? (
                <span>
                  {(item.priceAtCreate * item.quantity).toLocaleString("vi-VN")}{" "}
                  đ
                </span>
              ) : (
                <span>
                  {(item.product.price * item.quantity).toLocaleString("vi-VN")}{" "}
                  đ
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OrderProductItem;
