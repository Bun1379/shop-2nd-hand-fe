import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { postCreateUser } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import CategoryAPI from "../../../api/categoryAPI";
import UploadAPI from "../../../api/UploadAPI";
import ProductAPI from "../../../api/ProductAPI";
const ModalAddProduct = ({ showAdd, setShowAdd }) => {
  // const [show, setShow] = useState(false);
  const setShow = setShowAdd;
  const show = showAdd;
  const optionsSize = [
    {
      value: "S",
      label: "S",
    },
    {
      value: "M",
      label: "M",
    },
    {
      value: "L",
      label: "L",
    },
    {
      value: "XL",
      label: "XL",
    },
    {
      value: "XXL",
      label: "XXL",
    },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState({
    value: "S",
    label: "S",
  });
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState([]);
  const [listPreviewImage, setListPreviewImage] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  const fetchCategory = async () => {
    try {
      const response = await CategoryAPI.getAllCategories();
      setCategory(response.data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCate = (event) => {
    const cateId = event.target.value;
    const cate = category.find((item) => item._id === cateId);
    if (!cate) return;
    const isExist = selectedCategory.find((item) => item === cate);
    if (!isExist) {
      setSelectedCategory([...selectedCategory, cate]);
    }
  };

  const handleRemoveCate = (cateId) => {
    const newCate = selectedCategory.filter((item) => item._id !== cateId);
    setSelectedCategory(newCate);
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setListPreviewImage([
        ...listPreviewImage,
        URL.createObjectURL(event.target.files[0]),
      ]);
      setImage([...image, event.target.files[0]]);
    }
  };

  const handleDeleteImage = (index) => {
    const newImage = image.filter((item, idx) => idx !== index);
    const newPreview = listPreviewImage.filter((item, idx) => idx !== index);
    setImage(newImage);
    setListPreviewImage(newPreview);
  };

  const handleCreateProduct = async () => {
    if (
      !name ||
      !description ||
      !size ||
      !price ||
      !image ||
      !selectedCategory ||
      !quantity
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const data = {
      productName: name,
      description,
      size: size.value,
      price,
      quantity,
      category: selectedCategory.map((item) => item._id),
    };
    const images = [];
    for (let i = 0; i < image.length; i++) {
      const response = await UploadAPI.Upload(image[i]);
      if (response.status === 200) {
        images.push(response.data.DT);
      }
    }
    data.images = images;
    console.log(data);
    const response = await ProductAPI.CreateProduct(data);
    if (response.status === 200) {
      toast.success("Tạo sản phẩm thành công");
      handleClose();
    } else {
      toast.error("Tạo sản phẩm thất bại");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Size</label>
              <ReactSelect
                options={optionsSize}
                value={size}
                onChange={(selected) => setSize(selected)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Danh mục: </label>
              <select
                className="form-select"
                // value={role}
                onChange={handleChangeCate}
              >
                <option value="0">Chọn danh mục</option>
                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Giá cả: </label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Danh mục được chọn: </label>
              <ul>
                {selectedCategory.map((item) => {
                  return (
                    <div className="d-flex align-items-center" key={item._id}>
                      <li>{item.name}</li>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => handleRemoveCate(item._id)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload btn btn-primary"
                htmlFor="labelUpload"
              >
                Upload your image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12">
              {listPreviewImage && listPreviewImage.length > 0 ? (
                listPreviewImage.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt="preview"
                      style={{ width: "100px", height: "100px" }}
                      onClick={() => handleDeleteImage(index)}
                    />
                  );
                })
              ) : (
                <span>Preview Image</span>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label">Số lượng:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddProduct;
