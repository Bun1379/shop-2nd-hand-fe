import React, { useState, useEffect } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { Carousel } from "react-bootstrap";
import HomeDiscount from "./Discount/HomeDiscount";
import BannerAPI from "../../../api/BannerAPI";
import HomeReview from "./Review/HomeReview";
import ReactPaginate from "react-paginate";
import ProductItem from "../../../components/ProductItem/ProductItem";

function Home() {
  const [arrayProducts, setArrayProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const fetchDataBanner = async () => {
    try {
      const response = await BannerAPI.GetBanners();
      const rawBanner = response.data.DT;
      const activeBanner = rawBanner.filter((banner) => banner.status === true);
      setBanner(activeBanner);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };

  useEffect(() => {
    fetchDataProducts();
    fetchDataBanner();
  }, []);

  const fetchDataProducts = async () => {
    try {
      const response = await ProductAPI.GetProducts({ page });
      setArrayProducts(response.data.DT.products);
      setTotalPages(response.data.DT.totalPages);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };

  useEffect(() => {
    fetchDataProducts();
  }, [page]);

  return (
    <>
      <div className="my-5">
        {/* Carousel */}
        <Carousel className="mb-5">
          {banner.map((banner, index) => (
            <Carousel.Item
              key={index}
              onClick={(event) => {
                window.location.href = banner.url;
                event.preventDefault();
              }}
            >
              <img
                className="d-block w-100"
                src={banner.image}
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "600px",
                }}
              />
              <Carousel.Caption className="text-white p-4">
                <h3 style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  display: "inline-block",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}>
                  {banner.title}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Home Discount */}
        <HomeDiscount />

        {/* Title for new products */}
        <h1
          className="w-100 text-center text-uppercase mb-4 mt-5 bg-white border border-2 border-success rounded p-3"
          id="new-products"
        >
          Hàng mới về
        </h1>
        {/* Product List */}
        <div className="container-fluid w-100 bg-white border border-2 border-success rounded justify-content-center ">
          <div
            className="w-100 mt-4"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "3rem",
            }}
          >
            {arrayProducts.map((product) => (
              <div
                className="product-item text-wrap shadow"
                key={product._id}
                style={{
                  width: "240px",
                }}
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              nextLabel="Sau >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< Trước"
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

        {/* Home Review */}
        <h1
          className=" text-center text-uppercase mb-4 mt-5 bg-white border border-2 border-success rounded p-3"
          id="reviews"
        >
          Đánh giá của khách hàng
        </h1>
        <HomeReview />
      </div>
    </>
  );
}

export default Home;
