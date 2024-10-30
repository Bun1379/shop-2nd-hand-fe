import React from "react";
import "./Home.css";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useState, useEffect } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { Carousel } from "react-bootstrap";
import HomeDiscount from "./Discount/HomeDiscount";

function Home() {
  const [arrayProducts, setArrayProducts] = useState([]);
  useEffect(() => {
    fetchDataProducts();
  }, []);

  const fetchDataProducts = async () => {
    try {
      const response = await ProductAPI.GetProducts({ page: 1 });
      setArrayProducts(response.data.DT.products);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };

  return (
    <>
      <div className="home-new-product-container">
        <Carousel className="z-0">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://im.uniqlo.com/global-cms/spa/resf4d43f245d6bc6c5086983a35ccb5238fr.jpg"
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h3>Nam</h3>
              <p>Xem những đồ dành cho nam</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://im.uniqlo.com/global-cms/spa/resf6d6f43f7aed4e5342cc1b8ff118894bfr.jpg"
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h3>Nữ</h3>
              <p>Xem những đồ dành cho nữ</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="my-5">
          <HomeDiscount />
        </div>
        <h1 className="mt-2">Hàng mới về</h1>
        <div className="home-new-product-container-list">
          {arrayProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
