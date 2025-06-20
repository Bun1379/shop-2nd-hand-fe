import React, { useEffect } from "react";
import "./ProductDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import CartAPI from "../../api/CartAPI";
import ReviewAPI from "../../api/ReviewAPI";
import Review from "../User/Review/Review";
import RecentlyViewedProducts from "../../components/RecentlyView/RecentlyView";
import UserAPI from "../../api/UserAPI";
import { updateQuantityCart } from "../../components/Header/Header";
import ReactPaginate from "react-paginate";
import BranchStock from "../../api/BranchStockAPI";
import parse from "html-react-parser";
import { Rating } from "@smastrom/react-rating";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [reviews, setReviews] = useState([]);
  const [favouriteText, setFavouriteText] = useState("Yêu thích");
  const [outOfStock, setOutOfStock] = useState(false);
  const [branchStock, setBranchStock] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

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
      toast.error(error.response.data.EM);
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

  const fetchBranchStock = async () => {
    const response = await BranchStock.getBranchStockWithProduct(product._id);
    if (response.status === 200) {
      setBranchStock(response.data.DT);
      const totalStock = response.data.DT.reduce(
        (sum, stock) => sum + stock.quantity,
        0
      );
      setOutOfStock(totalStock === 0);
    } else {
      toast.error(response.data.EM);
    }
  };

  // Tính toán đánh giá trung bình
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
    setMainImage(product.images[0]);
    fetchFavourite();
    setQuantity(1);
    fetchBranchStock();
  }, [product]);

  useEffect(() => {
    setAverageRating(calculateAverageRating(reviews));
  }, [reviews]);

  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product]);

  //Phân trang đánh giá
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 5; // Số lượng đánh giá mỗi trang

  // Tính toán dữ liệu phân trang
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);
  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  // Hàm xử lý khi đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
          <h1 className="product-title mb-2">{product.productName}</h1>
          <div className="d-flex align-items-center">
            <Rating value={averageRating} readOnly style={{ width: "20%" }} />
            <span className="text-muted ms-2">
              {averageRating} ({reviews.length} đánh giá)
            </span>
          </div>
          {product.original_price > 0 && (
            <h4 className="text-muted product-price mt-2">
              <del>{product.original_price.toLocaleString("vi-VN")} đ</del>
            </h4>
          )}

          <h3 className="text-danger mt-2 product-price">
            {product.price.toLocaleString()} đ
          </h3>

          <p className="mt-3 product-quantity">
            <span className="fw-bold">Phân loại: </span>{" "}
            {product.category.map((category) => category.name).join(", ")}
          </p>

          <p className="mt-3 product-quantity">
            <span className="fw-bold">Tình trạng: </span>{" "}
            {optionConditions.find(
              (option) => option.value === product.condition
            )?.label || product.condition}
          </p>

          <p className="mt-3 product-quantity">
            <span className="fw-bold">Size: </span> {product.size}
          </p>

          <p className="mt-3 product-quantity">
            <span className="fw-bold">Sản phẩm hiện có:</span>{" "}
            <div
              className="border p-3 rounded mt-3"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                overflowX: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "#f8f9fa",
              }}
            >
              <Row
                className="fw-bold border-bottom pb-2 mb-2"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <Col xs={8} className="py-2">
                  <i className="bi bi-shop me-2"></i>Chi nhánh
                </Col>
                <Col xs={4} className="text-end py-2">
                  <i className="bi bi-box-seam me-2"></i>Số lượng
                </Col>
              </Row>
              {branchStock.map((item, index) => (
                <Row
                  key={index}
                  className="border-bottom py-3 align-items-center hover-effect"
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#f1f3f5",
                    },
                  }}
                >
                  <Col xs={10} className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt text-primary fs-5"></i>
                    <div>
                      <span
                        className="fw-medium d-block"
                        style={{ color: "#2563eb", fontSize: "1.1rem" }}
                      >
                        {item.branch.name}
                      </span>
                      <span className="text-muted small">
                        {item.branch.address}
                      </span>
                    </div>
                  </Col>

                  <Col xs={2} className="text-center">
                    {item.quantity > 0 ? (
                      <span
                        className="badge bg-success p-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {item.quantity}
                      </span>
                    ) : (
                      <span
                        className="badge bg-danger p-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Hết hàng
                      </span>
                    )}
                  </Col>
                </Row>
              ))}
            </div>
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
                  disabled={
                    quantity >=
                    branchStock.reduce((sum, stock) => sum + stock.quantity, 0)
                  }
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
          {parse(product.description)}
        </Col>
      </Row>

      {/* Đánh giá sản phẩm */}
      <hr className="border-5 border-primary" />

      <Row className="mt-3">
        <Col>
          {reviews.length === 0 ? (
            <h4>Chưa có đánh giá nào</h4>
          ) : (
            <>
              <h4 className="d-flex align-items-center gap-2">
                Đánh giá sản phẩm ({averageRating}
                <FaStar color="yellow" />) ({reviews.length} đánh giá)
              </h4>
              <Review reviews={currentReviews} />
              {/* Hiển thị đánh giá hiện tại */}
              {reviews.length > reviewsPerPage && ( // Hiển thị phân trang nếu có nhiều hơn 5 đánh giá}
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center mt-3"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              )}
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
