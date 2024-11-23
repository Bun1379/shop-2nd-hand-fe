import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import DashBoardAPI from "../../../api/DashBoardAPI";

const DashBoardStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const fetchDashboardStats = async () => {
    try {
      const response = await DashBoardAPI.GetDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <>
      <h5>Thống kê của hệ thống </h5>
      <Container className="mt-4">
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>Tổng sản phẩm</Card.Title>
                <Card.Text>{stats.totalProducts}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={3}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>Tổng người dùng</Card.Title>
                <Card.Text>{stats.totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={3}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>Tổng đơn hàng</Card.Title>
                <Card.Text>{stats.totalOrders}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={3}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>Tổng doanh thu</Card.Title>
                <Card.Text>
                  {stats.totalRevenue.toLocaleString("vi-VN")} VND
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashBoardStats;
