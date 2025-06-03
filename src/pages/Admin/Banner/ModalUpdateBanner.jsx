import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import BannerAPI from "../../../api/BannerAPI";
import UploadAPI from "../../../api/UploadAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductAPI from "../../../api/ProductAPI";

const ModalUpdateBanner = ({
  showUpdate,
  setShowUpdate,
  dataUpdate,
  fetchDataBanner,
}) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [status, setStatus] = useState(true);
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
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setName("");
    setLink("");
    setPosition(0);
    setStatus(true);
    setImage(null);
    setPreviewImage("");
    setSelectedProducts([]);
    setListProducts([]);
    setIsPromotion(false);
    setSlug("");
    setSearch("");
  };

  const handleUpdateBanner = async () => {
    setLoading(true);
    if (position < 0) {
      toast.error("Vị trí không được nhỏ hơn 0");
      setLoading(false);
      return;
    }
    if (!name || !link) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
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
      formData.append("title", name);
      formData.append("url", link);
      formData.append("position", position);
      formData.append("status", status);
      if (image) {
        const respone = await UploadAPI.Upload(image);
        formData.append("image", respone.data.DT);
      }
      if (isPromotion) {
        formData.append("slug", slug);
        selectedProducts.forEach((item) => {
          formData.append("products[]", item._id);
        });
      } else {
        formData.append("slug", "");
        formData.append("products", JSON.stringify([]));
      }
      const response = await BannerAPI.UpdateBanner(dataUpdate._id, formData);
      if (response.status === 200) {
        toast.success("Cập nhật banner thành công");
        fetchDataBanner();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setName(dataUpdate.title || "");
      setLink(dataUpdate.url || "");
      setStatus(dataUpdate.status);
      setPreviewImage(dataUpdate.image || "");
      setPosition(dataUpdate.position || 0);
      if (dataUpdate.slug) {
        setIsPromotion(true);
        setSlug(dataUpdate.slug);
        setSelectedProducts(dataUpdate.products || []);
      }
    }
  }, [showUpdate, dataUpdate]);

  useEffect(() => {
    fetchDataProduct();
  }, [debouncedSearch]);

  useEffect(() => {
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
    <Modal
      show={showUpdate}
      onHide={handleClose}
      {...(isPromotion && { size: "xl" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Tên banner</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên banner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicLink">
                <Form.Label>Liên kết</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập link"
                  disabled={isPromotion}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPosition">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập vị trí"
                  value={position}
                  min="0"
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicStatus">
                <Form.Check
                  type="checkbox"
                  label="Trạng thái"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicImage">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control type="file" onChange={handleUploadImage} />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "scale-down",
                    }}
                  />
                )}
              </Form.Group>
              <div className="form-group">
                <Form.Check
                  type="checkbox"
                  label="Khuyến mãi"
                  checked={isPromotion}
                  onChange={(e) => setIsPromotion(e.target.checked)}
                />
              </div>
              {isPromotion && (
                <Form.Group controlId="formBasicSlug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </Form.Group>
              )}
            </Form>
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
                placeholder="Tìm kiếm sản phẩm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ListGroup className="mt-2">
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
              </ListGroup>
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
          onClick={handleUpdateBanner}
          disabled={loading}
        >
          {loading ? "Loading..." : "Cập nhật"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateBanner;
