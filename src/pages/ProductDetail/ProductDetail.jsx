import React, { useEffect } from "react";
import "./ProductDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import CartAPI from "../../api/CartAPI";
import ReviewAPI from "../../api/ReviewAPI";
import Review from "../User/Review/Review";
import RecentlyViewedProducts from "../../components/RecentlyView/RecentlyView";
import UserAPI from "../../api/UserAPI";
import { updateQuantityCart } from "../../components/Header/Header";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [reviews, setReviews] = useState([]);
  const [favouriteText, setFavouriteText] = useState("Yêu thích");
  const [outOfStock, setOutOfStock] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      let rs = await CartAPI.UpdateQuantity({
        productId: product._id,
        quantity: parseInt(quantity),
      });
      if (rs.status === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
        updateQuantityCart();
      }
    } catch (error) {
      console.log("Error: ", error);
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

    const existingProductIndex = recentlyViewed.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      recentlyViewed[existingProductIndex] = product;
      recentlyViewed.unshift(recentlyViewed.splice(existingProductIndex, 1)[0]);
    } else {
      recentlyViewed.unshift(product);
      if (recentlyViewed.length > 5) {
        recentlyViewed.pop();
      }
    }

    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  };

  const handleFavourite = async (productId) => {
    try {
      await UserAPI.PutUpdateFavorite(productId);
      if (favouriteText === "Yêu thích") {
        toast.success("Đã thêm vào yêu thích");
        setFavouriteText("Bỏ yêu thích");
      } else {
        toast.success("Đã bỏ yêu thích");
        setFavouriteText("Yêu thích");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  const fetchFavourite = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const existingUserData = await UserAPI.GetUserInfo();
      const favoriteProducts = existingUserData.data.DT.favourites;
      if (favoriteProducts.some((item) => item._id === product._id)) {
        setFavouriteText("Đã yêu thích");
      } else {
        setFavouriteText("Yêu thích");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    setMainImage(product.images[0]);
    fetchFavourite();
    setQuantity(1);
    if (product.quantity === 0) {
      setOutOfStock(true);
    } else {
      setOutOfStock(false);
    }
  }, [product]);

  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product]);

  return (
    <Card className="product-detail-container border  p-4">
      <Row>
        {/* Phần hình ảnh sản phẩm */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Image
                src={selectedImage}
                alt={product.productName}
                fluid
                className="mb-3 rounded"
                style={{ maxWidth: "100%" }}
              />
              {/* Hình ảnh phụ */}
              <div className="product-thumbnails d-flex gap-2">
                {product.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    thumbnail
                    style={{ width: "80px", height: "80px", cursor: "pointer" }}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Phần chi tiết sản phẩm */}
        <Col md={6}>
          <h1 className="product-title">{product.productName}</h1>
          <h3 className="text-danger mt-3 product-price">
            {product.price.toLocaleString()} đ
          </h3>
          <p className="mt-3 product-quantity">
            <span className="fw-bold">Số lượng hiện có:</span>{" "}
            {product.quantity}
          </p>

          {/* Lựa chọn số lượng và thêm vào giỏ hàng */}
          <div className="product-actions mt-4">
            <Row className="align-items-center justify-content-start">
              {/* Số lượng */}
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  onClick={handleDecrease}
                  className="action-btn"
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </Button>
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="quantity-input text-center"
                  style={{ width: "80px", maxWidth: "80px" }} // Ensure the input size is fixed
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  onClick={handleIncrease}
                  className="action-btn"
                  disabled={quantity >= product.quantity}
                >
                  <FaPlus />
                </Button>
              </Col>
            </Row>

            {/* Thêm vào yêu thích */}
            <div className="mt-3">
              <Button
                variant="danger"
                className="d-flex align-items-center gap-2"
                onClick={() => handleFavourite(product._id)}
              >
                {favouriteText}
                <FaHeart color="white" />
              </Button>
            </div>
            {outOfStock ? (
              <p className="text-danger mt-3">Sản phẩm đã hết hàng</p>
            ) : (
              <div className="mt-3 d-flex gap-1">
                <Button variant="success" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
                <Button variant="warning" onClick={handleBuyNow}>
                  Mua ngay
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Mô tả chi tiết */}
      <Row className="mt-5">
        <Col>
          <h4>Chi tiết sản phẩm</h4>
          <p>{product.description || "Không có thông tin mô tả chi tiết."}</p>
        </Col>
      </Row>

      {/* Đánh giá sản phẩm */}
      <hr className="border-5 border-primary" />

      <Row className="mt-2">
        <Col>
          {reviews.length === 0 ? (
            <h4>Chưa có đánh giá nào</h4>
          ) : (
            <>
              <h4>Đánh giá sản phẩm ({reviews.length})</h4>
              <Review reviews={reviews} />
            </>
          )}
        </Col>
      </Row>
      <hr className="border-5 border-primary" />

      {/* Sản phẩm đã xem gần đây */}
      <Row className="mt-2">
        <Col>
          <RecentlyViewedProducts />
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;
