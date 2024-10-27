import "./SearchFilter.css";
import { FaList, FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CategoryAPI from "../../../api/categoryAPI";
import ColorAPI from "../../../api/ColorAPI";
import ReactSelect from "react-select";

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
}) => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="col-md-3">
      <div className="categories">
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control search-text"
            id="search"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-first bg-white z-index-0"
            onClick={() => onSearch(searchText)}
          >
            <FaSearch />
          </button>
        </div>

        <button className="btn btn-success w-100 mb-2">
          <FaList /> Danh mục sản phẩm
        </button>
        <div className="list-group">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  selectedCategories.includes(category._id) ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(category._id)}
                style={{ cursor: "pointer" }}
              >
                <span className="flex-grow-1">{category.name}</span>
              </div>
            ))
          ) : (
            <p>Không có danh mục nào để hiển thị</p>
          )}
        </div>
        <div className="mt-3">
          <ReactSelect
            options={optionConditions}
            value={selectedCondition}
            onChange={(selectedOption) => setSelectedCondition(selectedOption)}
            placeholder="Chọn điều kiện"
          />
        </div>
        <div className="mt-3">
          <ReactSelect
            options={listColor}
            value={selectedColor}
            onChange={(selectedOption) => setSelectedColor(selectedOption)}
            placeholder="Chọn màu"
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-danger w-100" onClick={resetFilter}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
