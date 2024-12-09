import React, { useState } from 'react'; // Import useState
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartAPI from '../../api/CartAPI';
import UserAPI from '../../api/UserAPI';
import { Card, Button } from 'react-bootstrap';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
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
    <Card className="h-100" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="image-container">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image || "https://via.placeholder.com/150"}
            className={`card-img-top ${index !== 0 ? 'hover-img' : ''}`}
            alt={product.productName}
          />
        ))}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-column flex-grow-1">
          <Card.Text className="text-wrap mb-1">{product.productName}</Card.Text>
        </div>
        <p className="text-danger mb-0">{product.price.toLocaleString("vi-VN")} đ</p>
        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button
            variant="outline-secondary"
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
