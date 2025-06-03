import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DashBoardAPI from "../../../api/DashBoardAPI";
import { FaBox, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

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

  const statCards = [
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts,
      icon: <FaBox size={24} />,
      color: "#4e73df",
      bgColor: "#e8f0fe",
      link: "/admin/product"
    },
    {
      title: "Tổng người dùng",
      value: stats.totalUsers,
      icon: <FaUsers size={24} />,
      color: "#1cc88a",
      bgColor: "#e6f7f0",
      link: "/admin/user"
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders,
      icon: <FaShoppingCart size={24} />,
      color: "#36b9cc",
      bgColor: "#e6f7f9",
      link: "/admin/order"
    },
    {
      title: "Tổng doanh thu",
      value: `${Math.floor(stats.totalRevenue).toLocaleString("vi-VN")} đ`,
      icon: <FaMoneyBillWave size={24} />,
      color: "#f6c23e",
      bgColor: "#fef8e6"
    }
  ];

  return (
    <Container className="mt-4">
      <Row>
        {statCards.map((card, index) => {
          const CardContent = (
            <Card
              className="mb-4 border-0 shadow-sm"
              style={{
                borderRadius: '10px',
                transition: 'transform 0.2s',
                cursor: card.link ? 'pointer' : 'default'
              }}
              onMouseOver={(e) => card.link && (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseOut={(e) => card.link && (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      className="text-muted mb-2"
                      style={{ fontSize: '0.9rem', fontWeight: '600' }}
                    >
                      {card.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: card.color
                      }}
                    >
                      {card.value}
                    </Card.Text>
                  </div>
                  <div
                    style={{
                      backgroundColor: card.bgColor,
                      padding: '15px',
                      borderRadius: '10px',
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          );

          return (
            <Col sm={12} md={6} lg={3} key={index}>
              {card.link ? (
                <Link to={card.link} style={{ textDecoration: 'none' }}>
                  {CardContent}
                </Link>
              ) : (
                CardContent
              )}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default DashBoardStats;
