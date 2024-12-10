import { useEffect, useState } from "react";
import ColorAPI from "../../../api/ColorAPI";
import ModalColor from "./ModalColor";
import { Table } from "react-bootstrap";

const ManageColor = () => {
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleEdit = (color) => {
    setColor(color);
    setShow(true);
  };

  const fetchDataColor = async () => {
    setLoading(true);
    try {
      const response = await ColorAPI.GetAllColors();
      setColors(response.data.DT);
    } catch (error) {
      console.log("Failed to fetch color list: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddColor = () => {
    setColor(null);
    setShow(true);
  };

  useEffect(() => {
    fetchDataColor();
  }, []);
  return (
    <div className="p-4">
      <h1>Quản lý màu</h1>
      <hr />
      <button className="btn btn-primary mb-2" onClick={handleAddColor}>
        Thêm màu
      </button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Color Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={color._id}>
              <td>{index + 1}</td>
              <td>{color.name}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(color)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalColor
        show={show}
        setShow={setShow}
        fetchDataColor={fetchDataColor}
        selectedColor={color}
      />
    </div>
  );
};

export default ManageColor;
