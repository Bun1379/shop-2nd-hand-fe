import React, { useEffect, useState, useMemo } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import DiscountAPI from "../../../../api/DiscountAPI";
import UserAPI from "../../../../api/UserAPI";
import { toast } from "react-toastify";
import "../Home.css";
const DiscountSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [userDiscounts, setUserDiscounts] = useState([]);
  const itemsPerPage = 3;

  // Tính toán groupedDiscounts mỗi khi discounts thay đổi
  const groupedDiscounts = useMemo(() => {
    const groups = [];
    for (let i = 0; i < discounts.length; i += itemsPerPage) {
      groups.push(discounts.slice(i, i + itemsPerPage));
    }
    return groups;
  }, [discounts]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedDiscounts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groupedDiscounts.length - 1 : prevIndex - 1
    );
  };

  const fetchDataDiscounts = async () => {
    try {
      const response = await DiscountAPI.getAllValidDiscount();
      setDiscounts(response.data.DT);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };

  const fetchUserDiscounts = async () => {
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
    fetchDataDiscounts();
    fetchUserDiscounts();
  }, []);

  return (
    <div className="w-100">
      <h1 className="text-center">Mã giảm giá</h1>
      <Row className="align-items-center d-flex justify-content-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handlePrev} className="mx-2">
            {"<"}
          </Button>
        </Col>

        {discounts.length > 0 &&
          groupedDiscounts[currentIndex]?.map((discount) => (
            <Col md={3} key={discount._id}>
              <Card style={{ height: "150px" }}>
                <Card.Body>
                  <Card.Title>Mã: {discount.discountCode}</Card.Title>
                  <Card.Text>Giảm: {discount.discountPercentage}%</Card.Text>
                  {/* {userDiscounts.includes(discount) ? (
                    <Card.Text className="text-danger">Đã nhận</Card.Text>
                  ) : (
                    <Button variant="success">Nhận</Button>
                  )} */}
                  {userDiscounts.length > 0 &&
                    userDiscounts.find(
                      (userDiscount) => userDiscount._id === discount._id
                    ) ? (
                    <Card.Text className="text-danger">Đã nhận</Card.Text>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleReceiveDiscount(discount._id)}
                    >
                      Lưu
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}

        <Col xs="auto">
          <Button variant="primary" onClick={handleNext} className="mx-2">
            {">"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DiscountSlider;
