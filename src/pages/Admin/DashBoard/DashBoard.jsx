import { Col, Row } from "react-bootstrap";
import DashBoardStats from "./DashBoardStats";
import OrderStatus from "./OrderStatus";
import RevenueChart from "./RevenueChart";
import { useEffect, useState } from "react";
import DashBoardAPI from "../../../api/DashBoardAPI";

const DashBoard = () => {
  const [apiData, setApiData] = useState({ dates: [], revenues: [] });
  const [apiDataByMonth, setApiDataByMonth] = useState({
    dates: [],
    revenues: [],
  });
  const fetchDataRevenue = async () => {
    try {
      const toDate = new Date();
      const fromDate = new Date(toDate - 7 * 24 * 60 * 60 * 1000);
      const response = await DashBoardAPI.GetRevenueChart(fromDate, toDate);
      setApiData(response.data.DT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataRevenueByMonth = async () => {
    try {
      const year = new Date().getFullYear();
      console.log(year);
      const response = await DashBoardAPI.GetRevenueChartByMonth(year);
      let rawData = response.data.DT;
      rawData.dates = rawData.months.map((month) => "Tháng " + month);
      setApiDataByMonth(rawData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataRevenue();
    fetchDataRevenueByMonth();
  }, []);
  return (
    <div className="p-4">
      <h1>Trang thống kê</h1>
      <hr />
      <DashBoardStats />
      <Row>
        <Col xs={12} md={6}>
          <h5>Biểu đồ doanh thu 7 ngày gần nhất</h5>
          <RevenueChart apiData={apiData} />
        </Col>
        <Col xs={12} md={6}>
          <h5>Biểu đồ doanh thu theo tháng</h5>
          <RevenueChart apiData={apiDataByMonth} />
        </Col>
        <Col xs={12} md={6}>
          <OrderStatus />
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
