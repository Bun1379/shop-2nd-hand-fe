import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import FavouriteItem from "./FavouriteItem";

const Favourite = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      setProducts(response.data.DT.favourites);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleRemoveFavourite = async (productId) => {
    try {
      const response = await UserAPI.PutUpdateFavorite(productId);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h3 className="text-center">Sản phẩm yêu thích</h3>
      {products.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Bạn chưa yêu thích sản phẩm nào
        </div>
      )}
      {products.length > 0 &&
        products.map((product, index) => (
          <FavouriteItem
            key={index}
            product={product}
            handleRemoveFavourite={handleRemoveFavourite}
          />
        ))}
    </>
  );
};

export default Favourite;
