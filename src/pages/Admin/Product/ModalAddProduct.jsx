import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { postCreateUser } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import CategoryAPI from "../../../api/CategoryAPI";
import UploadAPI from "../../../api/UploadAPI";
import ProductAPI from "../../../api/ProductAPI";
import ColorAPI from "../../../api/ColorAPI";
import { Image, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import { fashionFeatures } from "../../../helper/ConstantArray";
import OpenAiAPI from "../../../api/OpenaiAPI";

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
  // condition: { type: String, enum: ["NEW", "99%", "98%"], required: true },

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
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [original_price, setOriginal_Price] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState([]);
  const [listPreviewImage, setListPreviewImage] = useState([]);
  const [condition, setCondition] = useState({
    value: "NEW",
    label: "Mới",
  });
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
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
    setImage([]);
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

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validImageTypes = ["image/jpeg", "image/png"];

      // Kiểm tra định dạng ảnh
      if (!validImageTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận các tệp ảnh có định dạng JPG hoặc PNG");
        return;
      }

      setListPreviewImage([...listPreviewImage, URL.createObjectURL(file)]);
      setImage([...image, file]);
    }
  };

  const handleDeleteImage = (index) => {
    const newImage = image.filter((item, idx) => idx !== index);
    const newPreview = listPreviewImage.filter((item, idx) => idx !== index);
    setImage(newImage);
    setListPreviewImage(newPreview);
  };

  const handleCreateProduct = async () => {
    setIsLoad(true);
    if (
      !name ||
      !description ||
      !size ||
      !price ||
      !image ||
      !selectedCategory ||
      !quantity ||
      image.length === 0 ||
      selectedCategory.length === 0 ||
      !condition ||
      !selectedColor
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      setIsLoad(false);
      return;
    }
    if (price < 0) {
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
      original_price,
      price,
      quantity,
      category: selectedCategory.map((item) => item._id),
      condition: condition.value,
      color: selectedColor.value,
    };
    const images = [];
    for (let i = 0; i < image.length; i++) {
      const response = await UploadAPI.Upload(image[i]);
      if (response.status === 200) {
        images.push(response.data.DT);
      }
    }
    data.images = images;
    try {
      const response = await ProductAPI.CreateProduct(data);
      if (response.status === 200) {
        toast.success("Tạo sản phẩm thành công");
        handleClose();
      } else {
        toast.error("Tạo sản phẩm thất bại");
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    setSelectedColor(color[0]);
  }, [color]);

  useEffect(() => {
    fetchCategory();
    fetchColor();
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
                placeholder="Nhập tên sản phẩm"
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
              <ReactSelect
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
                onChange={(event) => setOriginal_Price(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Giá cả: </label>
              <input
                min="0"
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
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
                min="0"
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
            onClick={handleCreateProduct}
            disabled={isLoad}
          >
            {isLoad ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddProduct;
