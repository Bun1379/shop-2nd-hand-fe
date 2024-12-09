import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import FavouriteItem from "./FavouriteItem";
import ReactPaginate from "react-paginate";

const Favourite = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang

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

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Cập nhật trang hiện tại
  };

  return (
    <>
      <h3 className="text-center">Sản phẩm yêu thích</h3>
      {products.length === 0 && (
        <div className="text-center mt-4 text-primary">
          Bạn chưa yêu thích sản phẩm nào
        </div>
      )}
      {currentProducts.length > 0 &&
        currentProducts.map((product, index) => (
          <FavouriteItem
            key={index}
            product={product}
            handleRemoveFavourite={handleRemoveFavourite}
          />
        ))}

      {/* Pagination */}
      {products.length > 0 && products.length > productsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <ReactPaginate
            nextLabel="Sau >"
            previousLabel="< Trước"
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
        </div>
      )}
    </>
  );
};

export default Favourite;
