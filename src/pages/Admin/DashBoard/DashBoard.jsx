import { Button, Col, Form, Row, Nav, Tab } from "react-bootstrap";
import DashBoardStats from "./DashBoardStats";
import OrderStatus from "./OrderStatus";
import RevenueChart from "./RevenueChart";
import { useEffect, useState } from "react";
import DashBoardAPI from "../../../api/DashBoardAPI";
import { toast } from "react-toastify";
import CustomBarChart from "./CustomBarChart";

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
  // Cate seller
  const [categorySellerData, setCategorySellerData] = useState({});
  const [cateFromDate, setCateFromDate] = useState("");
  const [cateToDate, setCateToDate] = useState("");

  const fetchCategorySellerData = async () => {
    try {
      if (!cateFromDate || !cateToDate) {
        toast.error("Vui lòng chọn thời gian bắt đầu và kết thúc");
        return;
      }
      if (cateFromDate > cateToDate) {
        toast.error("Thời gian bắt đầu không được lớn hơn thời gian kết thúc");
        return;
      }
      if (cateFromDate === cateToDate) {
        toast.error("Thời gian bắt đầu và kết thúc không được trùng nhau");
        return;
      }
      let tmp = cateToDate;
      if (cateToDate === new Date().toISOString().split("T")[0]) {
        tmp = new Date();
      }
      const response = await DashBoardAPI.GetCateSellerChart(cateFromDate, tmp);
      setCategorySellerData(response.data.DT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      let tmp = toDate;
      if (toDate === new Date().toISOString().split("T")[0]) {
        tmp = new Date();
      }
      const response = await DashBoardAPI.GetRevenueChart(fromDate, tmp);
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
      const toDate = new Date();
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
      <h1 className="mb-4">Trang thống kê</h1>
      <DashBoardStats />

      <Tab.Container defaultActiveKey="revenue">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="revenue" className="text-dark">Doanh thu</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="orders" className="text-dark">Đơn hàng</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="category" className="text-dark">Danh mục</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="revenue">
            <Row>
              <Col xs={12} md={6}>
                <h5>Biểu đồ doanh thu 7 ngày gần nhất</h5>
                <RevenueChart apiData={apiData} />
              </Col>
              <Col xs={12} md={6}>
                <h5>Biểu đồ doanh thu theo tháng</h5>
                <RevenueChart apiData={apiDataByMonth} />
              </Col>
              <Col xs={12} className="mt-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h5>Biểu đồ doanh thu theo khoảng thời gian</h5>
                  <Form>
                    <Row className="g-3 align-items-end">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Chọn thời gian bắt đầu</Form.Label>
                          <Form.Control
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Chọn thời gian kết thúc</Form.Label>
                          <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>&nbsp;</Form.Label>
                          <Button
                            variant="primary"
                            onClick={fetchCustomData}
                            className="w-100"
                            style={{ height: '38px' }}
                          >
                            Xem thống kê
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  {customApiData.dates.length > 0 && (
                    <div className="mt-4">
                      <RevenueChart apiData={customApiData} />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="orders">
            <Row>
              <Col xs={12}>
                <div className="bg-white p-4 rounded shadow-sm">
                  <OrderStatus />
                </div>
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="category">
            <Row>
              <Col xs={12}>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h5>Biểu đồ sản phẩm bán được theo danh mục</h5>
                  <Form>
                    <Row className="g-3 align-items-end">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Chọn thời gian bắt đầu</Form.Label>
                          <Form.Control
                            type="date"
                            value={cateFromDate}
                            onChange={(e) => setCateFromDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Chọn thời gian kết thúc</Form.Label>
                          <Form.Control
                            type="date"
                            value={cateToDate}
                            onChange={(e) => setCateToDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>&nbsp;</Form.Label>
                          <Button
                            variant="primary"
                            onClick={fetchCategorySellerData}
                            className="w-100"
                            style={{ height: '38px' }}
                          >
                            Xem thống kê
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  {categorySellerData && Object.keys(categorySellerData).length > 0 && (
                    <div className="mt-4">
                      <CustomBarChart data={categorySellerData} />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default DashBoard;
