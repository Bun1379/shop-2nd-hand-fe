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
    review.product = selectedProduct._id;
    const response = await ReviewAPI.CreateReview(review);
    if (response.status === 200) {
      toast.success("Review successfully");
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
