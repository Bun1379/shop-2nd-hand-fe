import { useState } from "react";
import ModalAddProduct from "./ModalAddProduct";

const Product = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <div>
      <h1>Sản phẩm</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowAddProduct(true)}
      >
        Thêm sản phẩm
      </button>
      <ModalAddProduct
        showAdd={showAddProduct}
        setShowAdd={setShowAddProduct}
      />
    </div>
  );
};
export default Product;
