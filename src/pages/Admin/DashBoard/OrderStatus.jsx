import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import DashBoardAPI from "../../../api/DashBoardAPI";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const OrderStatus = () => {
  const [apiData, setApiData] = useState({}); // Start with null to check later
  const fetchDataOrderStatusDistribute = async () => {
    try {
      const response = await DashBoardAPI.GetOrderStats();
      setApiData(response.data.DT);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataOrderStatusDistribute();
  }, []);

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5>Thống kê tỷ lệ trạng thái đơn hàng</h5>
      <Pie
        data={{
          labels: Object.keys(apiData),
          datasets: [
            {
              data: Object.values(apiData),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverOffset: 4,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default OrderStatus;
