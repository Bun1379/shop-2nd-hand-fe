import { useEffect, useState } from "react";
import ReviewAPI from "../../../../api/ReviewAPI";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const HomeReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const handleClick = (product) => {
    navigate("/product-detail", { state: { product } });
  };

  const fetchDataReviews = async () => {
    setLoading(true);
    try {
      const response = await ReviewAPI.GetReviews({ page });
      setReviews(response.data.DT.rs);
      setTotalPages(response.data.DT.totalPages);
    } catch (error) {
      toast.error(error.response.data.EM);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataReviews();
  }, [page]);

  return (
    <div className="container py-5">
      <h1 className="text-center">Đánh giá của khách hàng</h1>

      {loading ? (
        <p className="text-center text-muted">Đang tải đánh giá...</p>
      ) : reviews.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="col"
              onClick={() => handleClick(review.product)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm">
                {/* Header với Avatar & Tên người dùng */}
                <div className="card-header d-flex align-items-center">
                  <img
                    src={review.user.image}
                    alt={review.user.username}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <h5 className="mb-0 fw-bold">{review.user.username}</h5>
                </div>

                {/* Thông tin Sản phẩm */}
                <img
                  src={review.product.images[0]}
                  alt={review.product.productName}
                  className="card-img-top"
                  height="200"
                  style={{ objectFit: "scale-down" }}
                />

                <div className="card-body text-center">
                  <h6 className="card-title fw-bold">
                    {review.product.productName}
                  </h6>

                  <div className="">
                    {/* Hiển thị sao vàng */}
                    {[...Array(Math.min(5, Number(review.rating)))].map(
                      (_, index) => (
                        <span key={`full-${index}`} className="text-warning">
                          ★
                        </span>
                      )
                    )}

                    {/* Hiển thị sao xám */}
                    {[...Array(5 - Math.min(5, Number(review.rating)))].map(
                      (_, index) => (
                        <span key={`empty-${index}`} className="text-muted">
                          ★
                        </span>
                      )
                    )}
                  </div>

                  <p className="card-text text-muted">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Không có đánh giá nào.</p>
      )}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default HomeReview;
