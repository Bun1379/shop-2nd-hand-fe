import { useEffect, useState } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ProductAPI from "../../../api/ProductAPI";
import BranchAPI from "../../../api/BranchAPI";
import BranchStockAPI from "../../../api/BranchStockAPI";
import ProductTable from "./ProductTable";
import { Accordion } from "react-bootstrap";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Select from "react-select";
import ModalAddBranchStock from "./ModalAddBranchStock";
import ModalShowBranchDistribution from "./ModalShowBranchDistribution";
import ModalRequestStock from "./ModalRequestStock";

const Product = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedOptionStock, setSelectedOptionStock] = useState(null);
  const [selectedSortPrice, setSelectedSortPrice] = useState(null);
  const [search, setSearch] = useState("");

  //RequestStock
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [requestList, setRequestList] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState(null); // Lưu chi nhánh được chọn
  const [branches, setBranches] = useState([]); // Lưu danh sách chi nhánh;
  const user = JSON.parse(localStorage.getItem("user"));

  //BranchStock
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

  const optionsStock = [
    { value: 0, label: "Hết hàng" },
    { value: 1, label: "Sắp hết hàng (< 10)" },
    { value: 2, label: "Còn hàng" },
  ];

  const optionsSortPrice = [
    { value: 1, label: "Giá thấp → cao" },
    { value: 2, label: "Giá cao → thấp" },
  ];

  useEffect(() => {
    if (user.role === "ADMIN") {
      BranchAPI.getAllBranches().then((res) => {
        if (res.status === 200) {
          const allBranches = res.data.DT.map((branch) => ({
            value: branch._id,
            label: branch.name,
          }));
          setBranches([{ value: 0, label: "Kho chính" }, ...allBranches]);
          setSelectedBranch({ value: 0, label: "Kho chính" });
        }
      });
    } else if (Array.isArray(user.branch) && user.branch.length > 0) {
      const userBranches = user.branch.map((branch) => ({
        value: branch._id,
        label: branch.name,
      }));
      setBranches(userBranches);
      setSelectedBranch(userBranches[0]);
    }
  }, []);

  const fetchDataProduct = async () => {
    try {
      const res = await ProductAPI.GetProducts({
        page,
        search,
        sortOrder: selectedSortPrice?.value,
        selectedOptionStock: selectedOptionStock?.value,
        selectedBranch: selectedBranch?.value,
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
    setSelectedSortPrice(null);
    setSearch("");
  };

  const onClickSearch = () => {
    if (page !== 1) setPage(1);
    fetchDataProduct();
  };

  // Gọi lại API khi các giá trị thay đổi
  useEffect(() => {
    fetchDataProduct();
  }, [
    selectedBranch,
    search,
    selectedOptionStock,
    selectedSortPrice,
    page,
    showAddProduct,
    showUpdateProduct,
  ]);
  return (
    <div className="p-4">
      <h1>Quản lý sản phẩm</h1>
      {user.role === "ADMIN" && (
        <button
          className="btn btn-primary"
          onClick={() => setShowAddProduct(true)}
        >
          Thêm sản phẩm
        </button>
      )}
      {user.branch.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => setShowModalRequest(true)}
        >
          Tạo yêu cầu nhập hàng
        </button>
      )}
      <Select
        options={branches}
        className="w-100 mt-2 "
        value={selectedBranch}
        onChange={setSelectedBranch}
      />
      <Accordion className="my-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lọc tìm kiếm</Accordion.Header>
          <Accordion.Body>
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
                options={optionsSortPrice}
                placeholder="Sắp xếp theo giá"
                className="w-50"
                value={selectedSortPrice}
                onChange={setSelectedSortPrice}
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
        branch={selectedBranch}
        setRequestList={setRequestList}
        requestList={requestList}
      />

      <ModalAddProduct
        showAdd={showAddProduct}
        setShowAdd={setShowAddProduct}
      />
      <ModalUpdateProduct
        showUpdate={showUpdateProduct}
        setShowUpdate={setShowUpdateProduct}
        product={product}
        setProduct={setProduct}
      />
      <ModalAddBranchStock
        selectedProduct={product}
        show={showDistribution}
        setShow={setShowDistribution}
        fetchDataProduct={fetchDataProduct}
      />
      <ModalShowBranchDistribution
        show={showBranchStock}
        setShow={setShowBranchStock}
        selectedProduct={product}
      />
      <ModalRequestStock
        selectedBranch={selectedBranch}
        showModalRequest={showModalRequest}
        setShowModalRequest={setShowModalRequest}
        requestList={requestList}
        setRequestList={setRequestList}
      />
    </div>
  );
};
export default Product;
