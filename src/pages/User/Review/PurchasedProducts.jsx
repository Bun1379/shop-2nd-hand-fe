import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import PurchasedProductItem from "./PurchasedProductItem";
import ModalAddReview from "./ModalAddReview";
import ReviewAPI from "../../../api/ReviewAPI";
import { toast } from "react-toastify";

const PurchasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleSubmitReview = async (review) => {
    if (!review.rating) {
      toast.error("Rating is required");
      return;
    }
    if (!review.comment) {
      toast.error("Comment is required");
      return;
    }
    review.product = selectedProduct._id;
    const response = await ReviewAPI.CreateReview(review);
    if (response.status === 200) {
      if (response.data.DT.discount) {
        const discount = response.data.DT.discount;
        toast.success(
          "Review successfully, you gain a discount: " +
            discount.discountCode +
            "-" +
            discount.discountPercentage +
            "%"
        );
      } else {
        toast.success(
          "Review successfully, we don't have any valid discount for you, sorry!"
        );
      }
      setShowReviewModal(false);
    } else {
      toast.error("Error: " + response.data.EM);
    }
  };

  const handleShowReviewModal = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const fetchaProductsPurchased = async () => {
    try {
      const response = await OrderAPI.GetProductPurchased();
      setProducts(response.data.DT);
    } catch (error) {
      console.error("Error:", error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchaProductsPurchased();
  }, []);
  return (
    <div>
      <h3 className="text-center">Sản phẩm đã mua</h3>
      {products.length === 0 && <p>No purchased products</p>}
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <PurchasedProductItem
            key={product._id}
            product={product}
            handleShowReviewModal={handleShowReviewModal}
          />
        ))}
      <ModalAddReview
        show={showReviewModal}
        setShow={setShowReviewModal}
        handleSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default PurchasedProducts;
