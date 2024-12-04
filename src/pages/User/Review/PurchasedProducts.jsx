import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import PurchasedProductItem from "./PurchasedProductItem";
import ReviewedProductItem from "./ReviewedProductItem";
import ModalAddReview from "./ModalAddReview";
import ReviewAPI from "../../../api/ReviewAPI";
import { toast } from "react-toastify";

const PurchasedProducts = () => {
  const [productsWithoutReview, setProductsWithoutReview] = useState([]);
  const [productsWithReview, setProductsWithReview] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [currentTab, setCurrentTab] = useState("unreviewed");

  const handleSubmitReview = async (review) => {
    if (!review.rating || !review.comment || review.comment.length < 10) {
      toast.error("Vui lòng cung cấp đầy đủ đánh giá hợp lệ.");
      return;
    }
    review.product = selectedProduct._id;
    if (currentTab == "reviewed") {
      console.log("Update review");
      fetchaProductsPurchased();
    } else {
      const response = await ReviewAPI.CreateReview(review);
      if (response.status === 200) {
        toast.success("Đánh giá thành công");
        setShowReviewModal(false);
        fetchaProductsPurchased();
      } else {
        toast.error("Error: " + response.data.EM);
      }
    };
  }

  const handleShowReviewModal = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };


  const fetchaProductsPurchased = async () => {
    try {
      const response = await OrderAPI.GetProductPurchased();
      setProductsWithoutReview(response.data.DT.productsWithoutReview);
      setProductsWithReview(response.data.DT.productsWithReview);
    } catch (error) {
      console.error("Error:", error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchaProductsPurchased();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Sản phẩm đã mua</h3>
      <ul className="nav nav-tabs" id="purchasedTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${currentTab === "unreviewed" ? "active" : ""}`}
            id="unreviewed-tab"
            onClick={() => setCurrentTab("unreviewed")}
            type="button"
          >
            Sản phẩm chưa đánh giá
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${currentTab === "reviewed" ? "active" : ""}`}
            id="reviewed-tab"
            onClick={() => setCurrentTab("reviewed")}
            type="button"
          >
            Sản phẩm đã đánh giá
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3" id="purchasedTabContent">
        <div
          className={`tab-pane fade ${currentTab === "unreviewed" ? "show active" : ""
            }`}
        >
          {productsWithoutReview.length === 0 && <p>Không có sản phẩm nào</p>}
          {productsWithoutReview.map((product) => (
            <PurchasedProductItem
              key={product._id}
              product={product}
              handleShowReviewModal={handleShowReviewModal}
            />
          ))}
        </div>
        <div
          className={`tab-pane fade ${currentTab === "reviewed" ? "show active" : ""
            }`}
        >
          {productsWithReview.length === 0 && <p>Không có sản phẩm nào</p>}
          {productsWithReview.map(({ review }) => (
            <ReviewedProductItem
              key={review._id}
              review={review}
              handleShowReviewModal={handleShowReviewModal}
            />
          ))}
        </div>
      </div>

      <ModalAddReview
        show={showReviewModal}
        setShow={setShowReviewModal}
        handleSubmitReview={handleSubmitReview}
        review={selectedProduct}
      />
    </div>
  );
};

export default PurchasedProducts;
