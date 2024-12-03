import { Row } from "react-bootstrap";
import DashBoardStats from "./DashBoardStats";
import OrderStatus from "./OrderStatus";
import RevenueChart from "./RevenueChart";

const DashBoard = () => {
  return (
    <div className="p-4">
      <h1>Trang thống kê</h1>
      <hr />
      <DashBoardStats />
      <Row>
        <RevenueChart />
        <OrderStatus />
      </Row>
    </div>
  );
};

export default DashBoard;
