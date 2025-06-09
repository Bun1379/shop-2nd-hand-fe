import { useEffect, useState } from "react";
import CategoryAPI from "../../../api/CategoryAPI";
import UploadAPI from "../../../api/UploadAPI";
import ProductAPI from "../../../api/ProductAPI";
import { toast } from "react-toastify";
import { Button, Image, Modal, Spinner } from "react-bootstrap";
import ReactSelect from "react-select";
import ColorAPI from "../../../api/ColorAPI";
import Select from "react-select";
import ReactQuill from "react-quill";
import { fashionFeatures } from "../../../helper/ConstantArray";
import OpenAiAPI from "../../../api/OpenaiAPI";

const ModalUpdateProduct = ({
  showUpdate,
  setShowUpdate,
  product,
  setProduct,
}) => {
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState({
    value: "S",
    label: "S",
  });
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [original_price, setOriginal_Price] = useState(0);
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
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isGenerateDescription, setIsGenerateDescription] = useState(false);

  const handleGenerateDescription = async () => {
    const features = selectedFeature.map((item) => item.value);
    if (features.length === 0) {
      toast.error("Vui lòng chọn ít nhất một đặc điểm");
      return;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    try {
      setIsGenerateDescription(true);
      const res = await OpenAiAPI.GenerateDescription({
        productName: name,
        features: features,
      });
      if (res.status === 200) {
        setDescription(res.data.DT);
        toast.success("Tạo mô tả thành công");
      } else {
        toast.error("Tạo mô tả thất bại");
      }
    } catch (error) {
      toast.error("Tạo mô tả thất bại");
    } finally {
      setIsGenerateDescription(false);
    }
  };

  const handleClose = () => {
    setSelectedFeature([]);
    setIsGenerateDescription(false);
    setProduct(null);
    setShow(false);
    setName("");
    setDescription("");
    setSize({
      value: "S",
      label: "S",
    });
    setSelectedCategory([]);
    setOriginal_Price(0);
    setPrice(0);
    setQuantity(0);
    setListPreviewImage([]);
    setActionsImage([]);
    setCondition({
      value: "NEW",
      label: "Mới",
    });
    setSelectedColor({});
    setIsLoad(false);
  };
  const fetchCategory = async () => {
    try {
      const response = await CategoryAPI.getAllCategories();
      setCategory(response.data.DT);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setListPreviewImage([...listPreviewImage, url]);
      setActionsImage([
        ...actionsImage,
        {
          action: "add",
          image: event.target.files[0],
          url: url,
        },
      ]);
    }
  };

  const handleDeleteImage = (index) => {
    const urlDeleted = listPreviewImage[index];
    if (urlDeleted.includes("blob")) {
      const newImage = listPreviewImage.filter((item, idx) => idx !== index);
      setListPreviewImage(newImage);
      const newActions = actionsImage.filter(
        (item, idx) => item.url !== urlDeleted
      );
      setActionsImage(newActions);
      return;
    }

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
    setIsLoad(true);
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !selectedCategory ||
      selectedCategory.length === 0 ||
      !selectedColor ||
      !selectedColor.value
    ) {
      toast.error("Please fill in all fields");
      setIsLoad(false);
      return;
    }
    if (price <= 0) {
      toast.error("Giá phải lớn hơn 0");
      setIsLoad(false);
      return;
    }
    if (original_price < 0) {
      toast.error("Giá gốc phải lớn hơn hoặc bằng 0");
      setIsLoad(false);
      return;
    }
    if (quantity < 0) {
      toast.error("Số lượng phải lớn hơn 0");
      setIsLoad(false);
      return;
    }
    const data = {
      productName: name,
      description,
      size: size.value,
      category: selectedCategory.map((item) => item._id),
      original_price,
      price,
      quantity,
      condition: condition.value,
      color: selectedColor.value,
    };
    let actions = [];
    for (const item of actionsImage) {
      if (item.action === "add") {
        let response = await UploadAPI.Upload(item.image);
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
    try {
      const response = await ProductAPI.UpdateProduct(product._id, data);
      if (response.status === 200) {
        toast.success("Cập nhật sản phẩm thành công");
        handleClose();
      } else {
        toast.error("Cập nhật sản phẩm thất bại");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    } finally {
      setIsLoad(false);
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
      setOriginal_Price(product?.original_price);
      setPrice(product?.price);
      setQuantity(product?.quantity);
      setSelectedCategory(product?.category);
      setListPreviewImage(product?.images);
      const condition = optionConditions.find(
        (item) => item.value === product?.condition
      );
      setCondition({
        value: product?.condition,
        label: condition?.label,
      });
      setSelectedColor({
        value: product?.color?._id,
        label: product?.color?.name,
      });
    }
  }, [product]);

  return (
    <>
      {show && (
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật sản phẩm</Modal.Title>
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
                <label className="form-label">Size</label>
                <ReactSelect
                  options={optionsSize}
                  value={size}
                  onChange={(selected) => setSize(selected)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Danh mục: </label>
                <Select
                  isMulti
                  options={category?.map((item) => {
                    return {
                      value: item._id,
                      label: item.name,
                    };
                  })}
                  value={selectedCategory?.map((item) => {
                    return {
                      value: item._id,
                      label: item.name,
                    };
                  })}
                  onChange={(selected) => {
                    const selectedIds = selected.map((item) => item.value);
                    const matched = category.filter((cat) =>
                      selectedIds.includes(cat._id)
                    );
                    setSelectedCategory(matched);
                  }}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Giá gốc: </label>
                <input
                  type="number"
                  className="form-control"
                  value={original_price}
                  min="0"
                  onChange={(event) => setOriginal_Price(Number(event.target.value))}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Giá cả: </label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  min="0"
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
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
                      <Image
                        rounded
                        key={index}
                        src={item}
                        alt="preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "10px",
                        }}
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
                  min="0"
                  className="form-control"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
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
              <div className="col-md-6">
                <label className="form-label">
                  Đặc điểm (Hỗ trợ việc sinh description)
                </label>
                <ReactSelect
                  isMulti
                  options={fashionFeatures}
                  value={selectedFeature}
                  onChange={(selected) => {
                    setSelectedFeature(selected);
                  }}
                />
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <Button
                  variant="primary"
                  onClick={handleGenerateDescription}
                  disabled={isGenerateDescription}
                >
                  {isGenerateDescription ? (
                    <>
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        Đang tạo mô tả
                        <Spinner animation="grow" size="20" />
                      </span>
                    </>
                  ) : (
                    "Tạo mô tả"
                  )}
                </Button>
              </div>
              <div className="col-md-12">
                <label className="form-label">Mô tả</label>
                <ReactQuill
                  readOnly={isGenerateDescription}
                  value={description}
                  onChange={setDescription}
                  theme="snow"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdateProduct}
              disabled={isLoad}
            >
              {isLoad ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalUpdateProduct;
