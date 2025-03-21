import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import UploadAPI from "../../../api/UploadAPI";
import BannerAPI from "../../../api/BannerAPI";
import ProductAPI from "../../../api/ProductAPI";

const ModalAddBanner = ({ showAdd, setShowAdd, fetchDataBanner }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isPromotion, setIsPromotion] = useState(false);
  const [slug, setSlug] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const fetchDataProduct = async () => {
    try {
      const res = await ProductAPI.GetProducts({ search: debouncedSearch });
      if (res.status === 200) {
        setListProducts(res.data.DT.products);
      }
    } catch (err) {
      console.log(err.response.data.EM);
    }
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleClose = () => {
    setShowAdd(false);
    setTitle("");
    setLink("");
    setPosition(0);
    setPreviewImage("");
    setImage(null);
    setSelectedProducts([]);
    setListProducts([]);
    setIsPromotion(false);
    setSlug("");
    setSearch("");
  };

  const handleAddBanner = async () => {
    setLoading(true);
    if (position < 0) {
      toast.error("Vị trí không được nhỏ hơn 0");
      setLoading(false);
      return;
    }
    if (!title || !link) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh");
      setLoading(false);
      return;
    }
    if (isPromotion && !slug) {
      toast.error("Vui lòng nhập slug");
      setLoading(false);
      return;
    }
    if (isPromotion && selectedProducts.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("url", link);
      formData.append("position", position);

      if (image) {
        const uploadResponse = await UploadAPI.Upload(image);
        formData.append("image", uploadResponse.data.DT);
      }

      if (isPromotion) {
        formData.append("slug", slug);
        selectedProducts.forEach((item) => {
          formData.append("products[]", item._id);
        });
      }

      const response = await BannerAPI.AddBanner(formData);
      if (response.status === 200) {
        toast.success("Thêm banner thành công");
        fetchDataBanner();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.EM || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!isPromotion) {
      setSelectedProducts([]);
    }
    if (isPromotion) {
      fetchDataProduct();
    }
  }, [isPromotion]);

  useEffect(() => {
    if (isPromotion) {
      setLink(`/promotion/${slug}`);
    }
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <Modal
        show={showAdd}
        onHide={handleClose}
        {...(isPromotion && { size: "xl" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Banner Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="title">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tiêu đề"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="link">Liên kết</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Link"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  disabled={isPromotion}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Vị trí</label>
                <input
                  type="number"
                  className="form-control"
                  id="position"
                  value={position}
                  min="0"
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label
                  className="form-label label-upload btn btn-primary"
                  htmlFor="labelUpload"
                >
                  Upload hình ảnh
                </label>
                <input
                  type="file"
                  hidden
                  id="labelUpload"
                  onChange={handleUploadImage}
                />
              </div>
              <div className="form-group ">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "scale-down",
                    }}
                  />
                )}
              </div>
              <div className="form-group">
                <Form.Check
                  type="checkbox"
                  label="Khuyến mãi"
                  checked={isPromotion}
                  onChange={(e) => setIsPromotion(e.target.checked)}
                />
              </div>
              {isPromotion && (
                <div className="form-group">
                  <label htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Slug"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              )}
            </Col>
            {isPromotion && (
              <Col
                sm={6}
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                  borderLeft: "1px solid #ccc",
                }}
              >
                <div>Sản phẩm đã chọn</div>
                {selectedProducts.length === 0 && (
                  <div className="fw-lighter fst-italic">
                    Chưa chọn sản phẩm nào
                  </div>
                )}
                {selectedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                  >
                    <span>{product.productName}</span>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        setSelectedProducts(
                          selectedProducts.filter(
                            (item) => item._id !== product._id
                          )
                        )
                      }
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                <div>Danh sách sản phẩm:</div>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {listProducts.length > 0 &&
                  isPromotion &&
                  listProducts.map((product) => (
                    <div
                      key={product._id}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "5px 0",
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        style={{ width: "50px", height: "50px" }}
                      />
                      <span>{product.productName}</span>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (
                            !selectedProducts.find(
                              (item) => item._id === product._id
                            )
                          ) {
                            setSelectedProducts([...selectedProducts, product]);
                          } else {
                            toast.info("Sản phẩm đã được thêm vào danh sách");
                          }
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  ))}
              </Col>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={handleAddBanner}
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddBanner;
