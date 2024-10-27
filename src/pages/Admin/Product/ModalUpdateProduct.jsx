import { useEffect, useState } from "react";
import CategoryAPI from "../../../api/categoryAPI";
import UploadAPI from "../../../api/UploadAPI";
import ProductAPI from "../../../api/ProductAPI";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import ReactSelect from "react-select";
import ColorAPI from "../../../api/ColorAPI";

const ModalUpdateProduct = ({ showUpdate, setShowUpdate, product }) => {
  const setShow = setShowUpdate;
  const show = showUpdate;
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
  //   const [image, setImage] = useState([]);
  const [listPreviewImage, setListPreviewImage] = useState([]);
  const [actionsImage, setActionsImage] = useState([]);
  const [condition, setCondition] = useState({
    value: "NEW",
    label: "Mới",
  });
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setSize({
      value: "S",
      label: "S",
    });
    setSelectedCategory([]);
    setPrice(0);
    setQuantity(0);
    setListPreviewImage([]);
    setActionsImage([]);
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
    const isExist = selectedCategory.find((item) => item._id === cate._id);
    if (!isExist) {
      setSelectedCategory([...selectedCategory, cate]);
    }
  };

  const handleRemoveCate = (id) => {
    const newCate = selectedCategory.filter((item) => item._id !== id);
    setSelectedCategory(newCate);
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setListPreviewImage([
        ...listPreviewImage,
        URL.createObjectURL(event.target.files[0]),
      ]);
      setActionsImage([
        ...actionsImage,
        {
          action: "add",
          image: event.target.files[0],
        },
      ]);
    }
  };

  const handleDeleteImage = (index) => {
    const urlDeleted = listPreviewImage[index];
    const newImage = listPreviewImage.filter((item, idx) => idx !== index);
    setListPreviewImage(newImage);
    setActionsImage([
      ...actionsImage,
      {
        action: "delete",
        image: urlDeleted,
      },
    ]);
  };

  const handleUpdateProduct = async () => {
    const data = {
      productName: name,
      description,
      size: size.value,
      category: selectedCategory.map((item) => item._id),
      price,
      quantity,
      condition: condition.value,
      color: selectedColor.value,
      // actionsImage,
    };
    let actions = [];
    for (const item of actionsImage) {
      if (item.action === "add") {
        let response = await UploadAPI.Upload(item.image);
        console.log(response);
        actions.push({
          action: "add",
          url: response.data.DT,
        });
      } else {
        actions.push({
          action: "delete",
          url: item.image,
        });
      }
    }
    data.actions = actions;
    console.log(data);
    let response = await ProductAPI.UpdateProduct(product._id, data);
    if (response.status === 200) {
      toast.success("Update product successfully");
      setShow(false);
    } else {
      toast.error("Update product failed");
    }
  };

  const fetchColor = async () => {
    try {
      const response = await ColorAPI.GetAllColors();
      setColor(
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

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product?.productName);
      setDescription(product?.description);
      setSize({
        value: product?.size,
        label: product?.size,
      });
      setPrice(product?.price);
      setQuantity(product?.quantity);
      setSelectedCategory(product?.category);
      setListPreviewImage(product?.images);
      setCondition({
        value: product?.condition,
        label: product?.condition,
      });
      setSelectedColor({
        value: product?.color?._id,
        label: product?.color?.name,
      });
    }
  }, [product]);

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
              <select className="form-select" onChange={handleChangeCate}>
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
                {selectedCategory &&
                  selectedCategory.length > 0 &&
                  selectedCategory.map((item) => {
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
            <div className="col-md-4">
              <label className="form-label">Số lượng:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Tình trạng:</label>
              <ReactSelect
                options={optionConditions}
                value={condition}
                onChange={(selected) => setCondition(selected)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Màu sắc:</label>
              <ReactSelect
                options={color}
                value={selectedColor}
                onChange={(selected) => setSelectedColor(selected)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateProduct;
