import React, { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Alert,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import axios from "axios";
import UserAPI from "../../../api/UserAPI";
import DiscountAPI from "../../../api/DiscountAPI";
import { toast } from "react-toastify";
import Select from "react-select";

const DiscountPage = () => {
  const optionsFilter = [
    { value: "", label: "Tất cả" },
    { value: "PRODUCT", label: "Giảm giá sản phẩm" },
    { value: "SHIPPING", label: "Giảm giá vận chuyển" },
  ];
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDiscounts, setUserDiscounts] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const fetchDataDiscounts = async () => {
    setLoading(true);
    try {
      const response = await DiscountAPI.getAllValidDiscount({
        type: typeFilter.value,
      });
      console.log(response.data.DT);
      setDiscounts(response.data.DT);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserDiscounts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await UserAPI.GetUserInfo();
      setUserDiscounts(response.data.DT.discounts);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };
  const handleReceiveDiscount = async (discountCode) => {
    try {
      const response = await UserAPI.PutUpdateDiscount(discountCode);
      toast.success(response.data.EM);
      fetchUserDiscounts();
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };
  useEffect(() => {
    fetchUserDiscounts();
  }, []);

  useEffect(() => {
    fetchDataDiscounts();
  }, [typeFilter]);

  return (
    <Container className="mt-4">
      <Select
        className="mb-4"
        options={optionsFilter}
        value={typeFilter}
        onChange={setTypeFilter}
        placeholder="Lọc theo loại"
      />
      <h2 className="text-center mb-4">Mã Giảm Giá Dành Cho Bạn</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {discounts.map((discount) => (
            <Col md={4} key={discount._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title className="text-center text-primary">
                    {discount.discountCode}
                  </Card.Title>
                  <Card.Text className="text-center">
                    Giảm {discount.discountPercentage}% cho đơn hàng của bạn!
                    <p>
                      Hết hạn:{" "}
                      <span className="fw-bold">
                        {discount.expiredAt
                          ? new Date(discount.expiredAt).toLocaleDateString()
                          : "Không"}
                      </span>
                    </p>
                  </Card.Text>
                  <Card.Footer className="text-center text-muted">
                    {userDiscounts.length > 0 &&
                    userDiscounts.find(
                      (userDiscount) => userDiscount._id === discount._id
                    ) ? (
                      <Card.Text className="text-danger">Đã nhận</Card.Text>
                    ) : (
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleReceiveDiscount(discount._id)}
                      >
                        Lưu
                      </Button>
                    )}
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DiscountPage;
