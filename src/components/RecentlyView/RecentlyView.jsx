import { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";

const RecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewedProducts(storedProducts);
  }, []);

  return (
    <div>
      <h4>Sản phẩm vừa xem</h4>
      {recentlyViewedProducts.length === 0 ? (
        <p>No recently viewed products</p>
      ) : (
        <div className="d-flex flex-row overflow-auto">
          {recentlyViewedProducts.map((product) => (
            <div className="m-2 w-100">
              <ProductItem key={product._id} product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
