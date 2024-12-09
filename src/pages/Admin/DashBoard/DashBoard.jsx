import { Button, Col, Form, Row } from "react-bootstrap";
import DashBoardStats from "./DashBoardStats";
import OrderStatus from "./OrderStatus";
import RevenueChart from "./RevenueChart";
import { useEffect, useState } from "react";
import DashBoardAPI from "../../../api/DashBoardAPI";
import { toast } from "react-toastify";

const DashBoard = () => {
  const [apiData, setApiData] = useState({ dates: [], revenues: [] });
  const [apiDataByMonth, setApiDataByMonth] = useState({
    dates: [],
    revenues: [],
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customApiData, setCustomApiData] = useState({
    dates: [],
    revenues: [],
  });

  const fetchCustomData = async () => {
    try {
      if (!fromDate || !toDate) {
        toast.error("Vui lòng chọn thời gian bắt đầu và kết thúc");
        return;
      }
      if (fromDate > toDate) {
        toast.error("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        return;
      }
      if (fromDate === toDate) {
        toast.error("Thời gian bắt đầu và kết thúc không được trùng nhau");
        return;
      }
      const response = await DashBoardAPI.GetRevenueChart(fromDate, toDate);
      setCustomApiData(response.data.DT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataRevenue = async () => {
    try {
      const setToStartOfDay = (date) => {
        date.setHours(0, 0, 0, 0);
        return date;
      };
      const toDate = setToStartOfDay(new Date());
      const fromDate = setToStartOfDay(
        new Date(toDate - 7 * 24 * 60 * 60 * 1000)
      );
      const response = await DashBoardAPI.GetRevenueChart(fromDate, toDate);
      setApiData(response.data.DT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataRevenueByMonth = async () => {
    try {
      const year = new Date().getFullYear();
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
        <Col xs={12} md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn thời gian bắt đầu</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chọn thời gian kết thúc</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={fetchCustomData}
              className="mt-2"
            >
              Xem thống kê
            </Button>

            {customApiData.dates.length > 0 && (
              <RevenueChart apiData={customApiData} />
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
