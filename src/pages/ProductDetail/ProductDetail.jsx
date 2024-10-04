import React, { useEffect } from "react";
import "./ProductDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

import CartAPI from "../../api/CartAPI";
import ReviewAPI from "../../api/ReviewAPI";
import Review from "../User/Review/Review";
import RecentlyViewedProducts from "../../components/RecentlyView/RecentlyView";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [reviews, setReviews] = useState([]);

  const handleAddToCart = async () => {
    try {
      let rs = await CartAPI.UpdateQuantity({
        productId: product._id,
        quantity: parseInt(quantity),
      });
      if (rs.status === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  const setMainImage = (image) => {
    setSelectedImage(image);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, e.target.value);
    setQuantity(value);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const fetchReviews = async () => {
    const response = await ReviewAPI.GetReviewByProduct(product._id);
    if (response.status === 200) {
      setReviews(response.data.DT);
    } else {
      toast.error(response.data.EM);
    }
  };

  const addToRecentlyViewed = (product) => {
    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    if (!recentlyViewed.some((item) => item._id === product._id)) {
      recentlyViewed.unshift(product);
      if (recentlyViewed.length > 5) {
        recentlyViewed.pop();
      }
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };

  useEffect(() => {
    fetchReviews();
    setMainImage(product.images[0]);
  }, [product]);

  useEffect(() => {
    addToRecentlyViewed(product);
  }, []);

  return (
    <div className="product-detail-container border border-success p-3 border-2">
      <div className="row">
        {/* Phần hình ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="product-image">
            <img
              src={selectedImage}
              alt={product.productName}
              className="img-fluid"
              style={{ width: "400px", height: "auto" }}
            />
          </div>
          {/* Hình ảnh phụ */}
          <div className="product-thumbnails mt-2">
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="img-thumbnail me-2"
                  style={{ width: "80px", height: "80px" }}
                  onClick={() => setMainImage(image)}
                />
              ))}
          </div>
        </div>

        {/* Phần chi tiết sản phẩm */}
        <div className="col-md-6">
          <h1>{product.productName}</h1>
          <h3 className="text-danger mt-5">
            {product.price.toLocaleString()} đ
          </h3>
          <p className="mt-3">
            <span className="fw-bold">Số lượng hiện có:</span>{" "}
            {product.quantity}
          </p>
          {/* Lựa chọn số lượng và thêm vào giỏ hàng */}
          <div className="product-actions">
            <div className="d-flex flex-row ms-auto gap-3 align-items-center">
              <label htmlFor="quantity" className="me-2">
                Số lượng:
              </label>
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecrease}
              >
                <FaMinus />
              </button>
              <input
                className="form-control"
                type="text"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={handleIncrease}
              >
                <FaPlus />
              </button>
            </div>
            <div className="mt-5">
              <button
                className="btn btn-success bg-opacity-"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button className="btn btn-success me-3" onClick={handleBuyNow}>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="row mt-4">
        <div className="col">
          <h4>Chi tiết sản phẩm</h4>
          <p>{product.description || "Không có thông tin mô tả chi tiết."}</p>
        </div>
      </div>
      {reviews.length === 0 && <h4>Chưa có đánh giá nào</h4>}
      {reviews.length > 0 && <h4>Đánh giá sản phẩm ({reviews.length})</h4>}
      {reviews.length > 0 && <Review reviews={reviews} />}
      <RecentlyViewedProducts />
    </div>
  );
};

export default ProductDetail;
