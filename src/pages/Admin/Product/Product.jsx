import { useEffect, useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ProductAPI from "../../../api/ProductAPI";
import ProductTable from "./ProductTable";
import { Accordion } from "react-bootstrap";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Select from "react-select";
import ModalAddBranchStock from "./ModalAddBranchStock";
import ModalShowBranchDistribution from "./ModalShowBranchDistribution";

const Product = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedOptionStock, setSelectedOptionStock] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [search, setSearch] = useState("");

  //BranchStock
  //begin
  const [showDistribution, setShowDistribution] = useState(false);
  const handleDistribution = (product) => {
    setProduct(product);
    setShowDistribution(true);
  };
  const [showBranchStock, setShowBranchStock] = useState(false);
  const handleShowBranchStockOfProduct = (product) => {
    setProduct(product);
    setShowBranchStock(true);
  };
  //end

  const optionsStock = [
    { value: 0, label: "Hết hàng" },
    { value: 1, label: "Sắp hết hàng (< 5)" },
    { value: 2, label: "Còn hàng" },
  ];

  const optionsPrice = [
    { value: 0, label: "< 100.000" },
    { value: 1, label: "100.000 - 500.000" },
    { value: 2, label: "500.000 - 1.000.000" },
    { value: 3, label: "> 1.000.000" },
  ];

  const fetchDataProduct = async () => {
    try {
      const res = await ProductAPI.GetProducts({
        page,
        search,
        selectedOptionPrice: selectedOptionPrice?.value,
        selectedOptionStock: selectedOptionStock?.value,
      });
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

  const handleResetButton = () => {
    setSelectedOptionStock(null);
    setSelectedOptionPrice(null);
    setSearch("");
  };

  const onClickSearch = () => {
    if (page !== 1) setPage(1);
    fetchDataProduct();
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
      <Accordion className="my-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc tìm kiếm</Accordion.Header>
          <Accordion.Body>
            {/* Nhập số lượng, giá */}
            <div className="d-flex flex-row gap-3 my-2">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Nhập tên sản phẩm cần tìm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                options={optionsStock}
                placeholder="Chọn tình trạng hàng"
                className="w-50"
                value={selectedOptionStock}
                onChange={setSelectedOptionStock}
              />
              <Select
                options={optionsPrice}
                placeholder="Chọn mức giá"
                className="w-50"
                value={selectedOptionPrice}
                onChange={setSelectedOptionPrice}
              />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-primary" onClick={onClickSearch}>
                Tìm kiếm
              </button>
              <button className="btn btn-primary" onClick={handleResetButton}>
                Làm mới
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ProductTable
        products={products}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        handleClickUpdate={handleClickUpdate}
        handleDistribution={handleDistribution}
        handleShowBranchStockOfProduct={handleShowBranchStockOfProduct}
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
      <ModalAddBranchStock
        selectedProduct={product}
        show={showDistribution}
        setShow={setShowDistribution}
      />
      <ModalShowBranchDistribution
        show={showBranchStock}
        setShow={setShowBranchStock}
        selectedProduct={product}
      />
    </div>
  );
};
export default Product;
