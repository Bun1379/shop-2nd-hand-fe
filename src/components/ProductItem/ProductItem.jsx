import React, { useState } from 'react'; // Import useState
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartAPI from '../../api/CartAPI';
import UserAPI from '../../api/UserAPI';
import { Card, Button } from 'react-bootstrap';

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

  const handleAddToFavourite = async (e) => {
    e.preventDefault();
    try {
      const rs = await UserAPI.PutUpdateFavorite(product._id);
      if (rs.status === 200) {
        toast.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  return (
    <Card className="product-card m-2" onClick={handleClick} style={{ cursor: "pointer", width: "240px" }}>
      <div className="image-container">
        <Card.Img
          style={{ height: "320px", objectFit: "cover" }}
          variant="top"
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt={product.productName}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-column flex-grow-1">
          <Card.Title className="text-uppercase">{product.category.name}</Card.Title>
          <Card.Text className="text-wrap mb-1">{product.productName}</Card.Text>
        </div>
        <p className="text-danger mb-0">{product.price.toLocaleString("vi-VN")} đ</p>
        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button
            variant="outline-danger"
            onClick={handleAddToFavourite}
            aria-label="Add to Favourite"
          >
            <FaHeart />
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleAddToCart}
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
