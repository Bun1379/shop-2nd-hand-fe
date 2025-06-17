import React, { useState } from "react"; // Import useState
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartAPI from "../../api/CartAPI";
import { Card, Button } from "react-bootstrap";
import "./ProductItem.css";
import { updateQuantityCart } from "../Header/Header";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const optionConditions = [
    {
      value: "NEW",
      label: "Mới",
    },
    {
      value: "LIKENEW",
      label: "Như mới",
    },
    {
      value: "VERYGOOD",
      label: "Rất tốt",
    },
    {
      value: "GOOD",
      label: "Tốt",
    },
    {
      value: "FAIR",
      label: "Khá ổn",
    },
  ];
  const handleClick = () => {
    navigate("/product-detail", { state: { product } });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const rs = await CartAPI.UpdateQuantity({
        productId: product._id,
        quantity: 1,
      });
      if (rs.status === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
        updateQuantityCart();
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  const handleAddToCartWithStopPropagation = (event) => {
    event.stopPropagation();
    handleAddToCart(event);
  };

  return (
    <Card
      className="h-100 w-100"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div className="image-container">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image || "https://via.placeholder.com/150"}
            className={`card-img-top ${index !== 0 ? "hover-img" : ""}`}
            alt={product.productName}
          />
        ))}
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="flex-grow-1 mb-2">
          <Card.Text className="fw-semibold text-truncate">
            {product.productName}
          </Card.Text>
        </div>
        <p className="mb-1 small text-secondary fst-italic">
          {optionConditions.find((option) => option.value === product.condition)
            ?.label || product.condition}
          <span className="mx-2">|</span>
          {product.size}
        </p>

        {product.original_price > 0 && (
          <p className="text-muted mb-1 small">
            <del>{product.original_price.toLocaleString("vi-VN")} đ</del>
          </p>
        )}

        <p className="text-danger fw-bold mb-2">
          {product.price.toLocaleString("vi-VN")} đ
        </p>

        <div className="d-flex justify-content-end mt-auto">
          <Button
            variant="outline-secondary"
            className="rounded-circle"
            onClick={handleAddToCartWithStopPropagation}
            aria-label="Add to Cart"
          >
            <FaShoppingCart />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
