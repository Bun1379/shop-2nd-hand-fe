import "./SearchFilter.css";
import { FaList, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import CategoryAPI from "../../../api/categoryAPI";

const SearchFilter = ({ onSelectCategory, onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryAPI.getAllCategories();
        setCategories(response.data.DT);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục: ", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    onSelectCategory(categoryId, "");
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
      </div>
    </div>
  );
};

export default SearchFilter;
