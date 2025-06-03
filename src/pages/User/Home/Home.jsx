import React, { useState, useEffect } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { Button, Carousel } from "react-bootstrap";
import HomeDiscount from "./Discount/HomeDiscount";
import BannerAPI from "../../../api/BannerAPI";
import HomeReview from "./Review/HomeReview";
import ReactPaginate from "react-paginate";
import ProductItem from "../../../components/ProductItem/ProductItem";
import BranchStock from "../../../api/BranchStockAPI";
import { NavLink, useNavigate } from "react-router-dom";
function Home() {
  const [arrayProducts, setArrayProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

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

  const [itemWidth, setItemWidth] = useState("20%");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 576) {
        setItemWidth("calc(50% - 0.5rem)");
      } else if (width < 768) {
        setItemWidth("calc(50% - 0.75rem)");
      } else if (width < 1200) {
        setItemWidth("calc(33.333% - 1rem)");
      } else {
        setItemWidth("calc(20% - 1rem)");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // gọi lần đầu

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="my-5">
        {/* Carousel */}
        <Carousel className="mb-5">
          {banner.map((banner, index) => (
            <Carousel.Item
              key={index}
              onClick={() => {
                navigate(banner.url);
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
                <h3
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  {banner.title}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Home Discount */}
        {/* <HomeDiscount /> */}
        {/* <Button variant="success">
          <Link to="/discounts" className="text-white text-decoration-none">
            Săn mã giảm giá
          </Link>
        </Button> */}

        {/* Title for new products */}
        <h1
          className="w-100 text-center text-uppercase mb-4 mt-5 bg-white border border-2 border-success rounded p-3"
          id="new-products"
        >
          Hàng mới về
        </h1>
        {/* Product List */}
        <div className="container-fluid w-100 bg-white border border-2 border-success rounded justify-content-center ">
          <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
            {arrayProducts.map((product) => (
              <div
                className=""
                key={product._id}
                style={{
                  width: itemWidth,
                }}
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="text-end mt-3 me-3 mb-3">
            <a
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#208454",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/search");
              }}
            >
              Xem thêm &gt;&gt;&gt;
            </a>
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
