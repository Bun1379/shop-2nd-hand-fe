import { useEffect, useState } from "react";
import ProductAPI from "../../../api/ProductAPI";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../../components/ProductItem/ProductItem";
import SearchFilter from "./SearchFilter";
import ReactSelect from "react-select";
import ColorAPI from "../../../api/ColorAPI";

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
      value: "99%",
      label: "99%",
    },
    {
      value: "98%",
      label: "98%",
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
        page: 1,
      });
      //   console.log(search);
      console.log(response.data.DT);
      setProducts(response.data.DT.products);
      setTotalPages(response.data.DT.totalPages);
      setPage(1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadMore = async () => {
    try {
      const response = await ProductAPI.GetProducts({
        search: searchParams.get("query"),
        sortOrder: sort.value,
        category: selectedCategories,
        page: page + 1,
      });
      // console.log(sort.value, page + 1);
      // console.log(response.data.DT.products);
      setProducts([...products, ...response.data.DT.products]);
      setPage(page + 1);
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

  useEffect(() => {
    const search = searchParams.get("query");
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
    <div className="d-flex flex-row gap-3">
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
      />
      <div className="text-center w-100">
        Kết quả tìm kiếm cho: {searchParams.get("query")}
        <ReactSelect options={options} value={sort} onChange={setSort} />
        <div
          className="d-flex justify-content-center flex-wrap"
        >
          {products.length === 0 && <div>Không tìm thấy sản phẩm</div>}
          {products.length > 0 &&
            products.map((product) => (
              <div className="m-2"
                style={{

                  width: '240px',
                }}
              >
                <ProductItem key={product._id} product={product} />
              </div>
            ))}
        </div>
        {page < totalPages && <button onClick={loadMore}>Xem thêm</button>}
      </div>
    </div>
  );
};
export default Search;
