import React from "react";
import "./Home.css";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useState, useEffect } from "react";
import ProductAPI from "../../../api/ProductAPI";

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
        <h1>Hàng mới về</h1>
        <div className="home-new-product-container-list">
          {arrayProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
