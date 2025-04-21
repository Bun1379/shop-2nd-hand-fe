import "./SearchFilter.css";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ColorAPI from "../../../api/ColorAPI";
import CategoryAPI from "../../../api/CategoryAPI";

const SearchFilter = ({
  onSelectCategory,
  onSearch,
  optionConditions,
  setSelectedCondition,
  listColor,
  setSelectedColor,
  resetFilter,
  selectedColor,
  selectedCondition,
  selectedCategories,
  optionSort,
  setSort,
  sort,
}) => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const fetchCategories = async () => {
    try {
      const response = await CategoryAPI.getAllCategories();
      setCategories(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    onSelectCategory(categoryId);
  };

  const handleConditionSelect = (condition) => {
    if (selectedCondition?.value === condition.value) {
      setSelectedCondition("");
    } else {
      setSelectedCondition(condition);
    }
  };

  const handleColorSelect = (color) => {
    if (selectedColor?.value === color.value) {
      setSelectedColor("");
    } else {
      setSelectedColor(color);
    }
  };

  const handleSortSelect = (sortOption) => {
    if (sort.value === sortOption.value) {
      setSort({ value: 0, label: "Mặc định" });
    } else {
      setSort(sortOption);
    }
  }

  return (
    <div className="filter-sidebar p-3 rounded bg-white shadow-sm" style={{ minWidth: "250px" }}>


      {/* Search Box */}
      <div className="search-box mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sản phẩm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary w-100 mt-2" onClick={() => onSearch(searchText)}>
          Tìm kiếm
        </button>
      </div>

      {/* Sort */}
      <div className="filter-section mb-4">
        <div
          className="filter-header d-flex justify-content-between align-items-center mb-2"
          onClick={() => setShowSort(!showSort)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0 fw-bold">Sắp xếp</h6>
          {showSort ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showSort && (
          <div className="filter-content">
            {optionSort && optionSort.length > 0 ? (
              optionSort.map((optionSort) => (
                <div
                  key={optionSort.value}
                  className={`sort-item mb-2 ${sort.value === optionSort.value ? "active" : ""}`}
                  onClick={() => handleSortSelect(optionSort)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: sort.value === optionSort.value ? "#208454" : "#f9f9f9",
                    color: sort.value === optionSort.value ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {optionSort.label}
                </div>
              ))
            ) : (
              <p>Không có màu sắc.</p>
            )}
          </div>
        )}
      </div>


      {/* Danh Mục */}
      <div className="filter-section mb-4">
        <div
          className="filter-header d-flex justify-content-between align-items-center mb-2"
          onClick={() => setShowCategories(!showCategories)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0 fw-bold">Danh mục sản phẩm</h6>
          {showCategories ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showCategories && (
          <div className="filter-content">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className={`category-item mb-2 ${selectedCategories.includes(category._id) ? "active" : ""}`}
                  onClick={() => handleCategorySelect(category._id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: selectedCategories.includes(category._id) ? "#208454" : "#f9f9f9",
                    color: selectedCategories.includes(category._id) ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {category.name}
                </div>
              ))
            ) : (
              <p>Không có danh mục.</p>
            )}
          </div>
        )}
      </div>

      {/* Điều Kiện */}
      <div className="filter-section mb-4">
        <div
          className="filter-header d-flex justify-content-between align-items-center mb-2"
          onClick={() => setShowConditions(!showConditions)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0 fw-bold">Tình trạng</h6>
          {showConditions ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showConditions && (
          <div className="filter-content">
            {optionConditions && optionConditions.length > 0 ? (
              optionConditions.map((condition) => (
                <div
                  key={condition.value}
                  className={`condition-item mb-2 ${selectedCondition?.value === condition.value ? "active" : ""}`}
                  onClick={() => handleConditionSelect(condition)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: selectedCondition?.value === condition.value ? "#208454" : "#f9f9f9",
                    color: selectedCondition?.value === condition.value ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {condition.label}
                </div>
              ))
            ) : (
              <p>Không có tình trạng.</p>
            )}
          </div>
        )}
      </div>

      {/* Màu Sắc */}
      <div className="filter-section mb-4">
        <div
          className="filter-header d-flex justify-content-between align-items-center mb-2"
          onClick={() => setShowColors(!showColors)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0 fw-bold">Màu sắc</h6>
          {showColors ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showColors && (
          <div className="filter-content">
            {listColor && listColor.length > 0 ? (
              listColor.map((color) => (
                <div
                  key={color.value}
                  className={`color-item mb-2 ${selectedColor?.value === color.value ? "active" : ""}`}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: selectedColor?.value === color.value ? "#208454" : "#f9f9f9",
                    color: selectedColor?.value === color.value ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {color.label}
                </div>
              ))
            ) : (
              <p>Không có màu sắc.</p>
            )}
          </div>
        )}
      </div>

      {/* Xóa bộ lọc */}
      <button className="btn btn-outline-danger w-100" onClick={resetFilter}>
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
};

export default SearchFilter;
