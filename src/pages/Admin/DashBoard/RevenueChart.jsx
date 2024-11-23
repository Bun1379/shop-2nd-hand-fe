import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashBoardAPI from "../../../api/DashBoardAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart() {
  const [apiData, setApiData] = useState({});

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
  useEffect(() => {
    fetchDataRevenue();
  }, []);
  return (
    <div className="w-50">
      <h5>Biểu đồ doanh thu 7 ngày gần đây</h5>
      <Line
        data={{
          labels: apiData.dates,
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: apiData.revenues,
              fill: true,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}

export default RevenueChart;
