import React from "react";
import "./Home.css";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useState, useEffect } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { Carousel } from "react-bootstrap";
import HomeDiscount from "./Discount/HomeDiscount";
import BannerAPI from "../../../api/BannerAPI";
import HomeReview from "./Review/HomeReview";
import ReactPaginate from "react-paginate";

function Home() {
  const [arrayProducts, setArrayProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className="home-new-product-container">
        <Carousel className="z-0">
          {banner.map((banner, index) => (
            <Carousel.Item
              key={index}
              onClick={(event) => {
                window.location.href = banner.url;
                event.preventDefault();
              }}
              style={{
                width: "100%",
                height: "600px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                className="d-block w-100"
                src={banner.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <Carousel.Caption>
                <h3>{banner.title}</h3>
                <p>{banner.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="my-5">
          <HomeDiscount />
        </div>
        <h1 className="mt-2" id="new-products">
          Hàng mới về
        </h1>
        <div className="home-new-product-container-list">
          {arrayProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>

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

        <HomeReview />
      </div>
    </>
  );
}

export default Home;
