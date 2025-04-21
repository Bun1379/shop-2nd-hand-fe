import { useEffect, useState } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../../components/ProductItem/ProductItem";
import SearchFilter from "./SearchFilter";
import ReactSelect from "react-select";
import ColorAPI from "../../../api/ColorAPI";
import ReactPaginate from "react-paginate";
import { use } from "react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState({ value: 0, label: "Mặc định" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const optionConditions = [
    {
      value: "NEW",
      label: "Mới",
    },
    {
      value: "LIKENEW",
      label: "Như mới",
    },
    {
      value: "VERYGOOD",
      label: "Rất tốt",
    },
    {
      value: "GOOD",
      label: "Tốt",
    },
    {
      value: "FAIR",
      label: "Khá ổn",
    },
  ];
  const [selectedCondition, setSelectedCondition] = useState("");
  const [listColor, setListColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const options = [
    { value: 0, label: "Mặc định" },
    { value: 1, label: "Giá tăng dần" },
    { value: 2, label: "Giá giảm dần" },
  ];

  const fetchColor = async () => {
    try {
      const response = await ColorAPI.GetAllColors();
      setListColor(
        response.data.DT.map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (searchQuery) => {
    try {
      const response = await ProductAPI.GetProducts({
        search: searchQuery,
        sortOrder: sort.value,
        category: selectedCategories,
        condition: selectedCondition.value,
        color: selectedColor.value,
        page: page,
        limit: 8,
      });
      //   console.log(search);
      console.log(response.data.DT);
      setProducts(response.data.DT.products);
      setTotalPages(response.data.DT.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleCategorySelect = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) =>
        prev.filter((categoryId) => categoryId !== id)
      );
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    fetchData(searchParams.get("query"));
  }, [page]);

  useEffect(() => {
    const search = searchParams.get("query");
    setPage(1);
    fetchData(search);
  }, [
    searchParams,
    sort,
    selectedCategories,
    selectedCondition,
    selectedColor,
  ]);

  const resetFilter = () => {
    setSelectedCategories([]);
    setSelectedCondition("");
    setSelectedColor("");
    setSort({ value: 0, label: "Mặc định" });
  };

  useEffect(() => {
    fetchColor();
  }, []);

  return (
    <div className="d-flex flex-row gap-2">
      <SearchFilter
        onSelectCategory={handleCategorySelect}
        onSearch={fetchData}
        listColor={listColor}
        optionConditions={optionConditions}
        setSelectedCondition={setSelectedCondition}
        setSelectedColor={setSelectedColor}
        resetFilter={resetFilter}
        selectedColor={selectedColor}
        selectedCondition={selectedCondition}
        selectedCategories={selectedCategories}
        optionSort={options}
        setSort={setSort}
        sort={sort}
      />
      <div className="d-flex flex-column w-100">
        {/* <div className="">
          Kết quả tìm kiếm cho: {searchParams.get("query")}
        </div> */}
        {/* <ReactSelect options={options} value={sort} onChange={setSort} /> */}
        <div className="justify-content-center row">
          {products.length === 0 && <div>Không tìm thấy sản phẩm</div>}
          {products.length > 0 &&
            products.map((product) => (
              <div key={product._id} className="col-12 col-md-6 col-lg-3 mb-3">

                <ProductItem key={product._id} product={product} />
              </div>
            ))}
        </div>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="<"
              marginPagesDisplayed={2}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              forcePage={page - 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
