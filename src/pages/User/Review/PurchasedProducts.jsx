import { useEffect, useState } from "react";
import OrderAPI from "../../../api/OrderAPI";
import PurchasedProductItem from "./PurchasedProductItem";
import ReviewedProductItem from "./ReviewedProductItem";
import ModalAddReview from "./ModalAddReview";
import ReviewAPI from "../../../api/ReviewAPI";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const PurchasedProducts = () => {
  const [productsWithoutReview, setProductsWithoutReview] = useState([]);
  const [productsWithReview, setProductsWithReview] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentTab, setCurrentTab] = useState("unreviewed");

  const [currentPageWithoutReview, setCurrentPageWithoutReview] = useState(0);
  const [currentPageWithReview, setCurrentPageWithReview] = useState(0);

  const productsPerPage = 5;

  const handleSubmitReview = async (review) => {
    if (!review.rating || !review.comment || review.comment.length < 10) {
      toast.error(
        "Vui lòng cung cấp đầy đủ đánh giá, nhận xét và nhận xét ít nhất 10 ký tự"
      );
      return;
    }
    if (currentTab === "reviewed") {
      review._id = selectedProduct._id;
      const data = { ...review };
      const response = await ReviewAPI.UpdateReview(data);
      if (response.status === 200) {
        toast.success("Cập nhật đánh giá thành công");
        setShowReviewModal(false);
        fetchaProductsPurchased();
      } else {
        toast.error("Error: " + response.data);
      }
    } else {
      review.product = selectedProduct._id;
      const response = await ReviewAPI.CreateReview(review);
      if (response.status === 200) {
        toast.success("Đánh giá thành công");
        setShowReviewModal(false);
        fetchaProductsPurchased();
      } else {
        toast.error("Error: " + response.data.EM);
      }
    }
  };

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

  const handlePageClickWithoutReview = (data) => {
    setCurrentPageWithoutReview(data.selected);
  };

  const handlePageClickWithReview = (data) => {
    setCurrentPageWithReview(data.selected);
  };

  useEffect(() => {
    fetchaProductsPurchased();
  }, []);

  // Xử lý phân trang cho sản phẩm chưa đánh giá
  const offsetWithoutReview = currentPageWithoutReview * productsPerPage;
  const currentProductsWithoutReview = productsWithoutReview.slice(
    offsetWithoutReview,
    offsetWithoutReview + productsPerPage
  );

  // Xử lý phân trang cho sản phẩm đã đánh giá
  const offsetWithReview = currentPageWithReview * productsPerPage;
  const currentProductsWithReview = productsWithReview.slice(
    offsetWithReview,
    offsetWithReview + productsPerPage
  );

  return (
    <div className="container mt-1">
      <h3 className="text-center mb-4 ">Sản phẩm đã mua</h3>
      <ul className="nav nav-tabs bg-white" id="purchasedTabs" role="tablist">
        <li className="nav-item w-50" role="presentation">
          <button
            className={`w-100 nav-link ${
              currentTab === "unreviewed"
                ? "active text-white bg-success"
                : "text-dark"
            }`}
            id="unreviewed-tab"
            onClick={() => setCurrentTab("unreviewed")}
            type="button"
          >
            Sản phẩm chưa đánh giá
          </button>
        </li>
        <li className="nav-item w-50" role="presentation">
          <button
            className={`w-100 nav-link ${
              currentTab === "reviewed"
                ? "active text-white bg-success"
                : "text-dark"
            }`}
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
          className={`tab-pane fade ${
            currentTab === "unreviewed" ? "show active" : ""
          }`}
        >
          {currentProductsWithoutReview.length === 0 && (
            <p className="text-center mt-4 text-primary">
              Không có sản phẩm nào
            </p>
          )}
          {currentProductsWithoutReview.map((product) => (
            <PurchasedProductItem
              key={product._id}
              product={product}
              handleShowReviewModal={handleShowReviewModal}
            />
          ))}
          {productsWithoutReview.length > 0 &&
            productsWithoutReview.length > productsPerPage && (
              <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                  nextLabel=">"
                  previousLabel="<"
                  breakLabel={"..."}
                  pageCount={Math.ceil(
                    productsWithoutReview.length / productsPerPage
                  )}
                  onPageChange={handlePageClickWithoutReview}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  pageRangeDisplayed={5}
                />
              </div>
            )}
        </div>
        <div
          className={`tab-pane fade ${
            currentTab === "reviewed" ? "show active" : ""
          }`}
        >
          {currentProductsWithReview.length === 0 && (
            <p className="text-center mt-4 text-primary">
              Không có sản phẩm nào
            </p>
          )}
          {currentProductsWithReview.map(({ review }) => (
            <ReviewedProductItem
              key={review._id}
              review={review}
              handleShowReviewModal={handleShowReviewModal}
            />
          ))}
          {productsWithReview.length > 0 &&
            productsWithReview.length > productsPerPage && (
              <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                  nextLabel=">"
                  previousLabel="<"
                  breakLabel={"..."}
                  pageCount={Math.ceil(
                    productsWithReview.length / productsPerPage
                  )}
                  onPageChange={handlePageClickWithReview}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  pageRangeDisplayed={5}
                />
              </div>
            )}
        </div>
      </div>

      <ModalAddReview
        show={showReviewModal}
        setShow={setShowReviewModal}
        handleSubmitReview={handleSubmitReview}
        review={selectedProduct}
        setReview={setSelectedProduct}
      />
    </div>
  );
};

export default PurchasedProducts;
