import { useEffect, useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ProductAPI from "../../../api/ProductAPI";
import ProductTable from "./ProductTable";
import { Modal } from "react-bootstrap";
import ModalUpdateProduct from "./ModalUpdateProduct";

const Product = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});

  const fetchDataProduct = async () => {
    try {
      const res = await ProductAPI.GetProducts({ page });
      if (res.status === 200) {
        setProducts(res.data.DT.products);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };

  const handleClickUpdate = async (product) => {
    try {
      setProduct(product);
      setShowUpdateProduct(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, [page, showAddProduct, showUpdateProduct]);

  return (
    <div className="p-4">
      <h1>Quản lý sản phẩm</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowAddProduct(true)}
      >
        Thêm sản phẩm
      </button>
      <ProductTable
        products={products}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        handleClickUpdate={handleClickUpdate}
      />
      <ModalAddProduct
        showAdd={showAddProduct}
        setShowAdd={setShowAddProduct}
      />
      <ModalUpdateProduct
        showUpdate={showUpdateProduct}
        setShowUpdate={setShowUpdateProduct}
        product={product}
      />
    </div>
  );
};
export default Product;
