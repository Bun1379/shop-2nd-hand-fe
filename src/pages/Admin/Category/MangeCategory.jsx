import { useEffect, useState } from "react";
import CategoryAPI from "../../../api/CategoryAPI";
import ModalAddCategory from "./ModalAddCategory";
import { Table } from "react-bootstrap";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleEdit = (category) => {
    setCategory(category);
    setShow(true);
  };
  const fetchDataCategory = async () => {
    setLoading(true);
    try {
      const response = await CategoryAPI.getAllCategories();
      setCategories(response.data.DT);
    } catch (error) {
      console.log("Failed to fetch category list: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddCategory = () => {
    setCategory(null);
    setShow(true);
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
  return (
    <>
      <div className="p-4">
        <h1>Quản lý danh mục</h1>
        <hr />
        <button className="btn btn-primary" onClick={handleAddCategory}>
          Thêm danh mục
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ModalAddCategory
        show={show}
        setShow={setShow}
        fetchDataCategory={fetchDataCategory}
        selectedCategory={category}
      />
    </>
  );
};

export default ManageCategory;
