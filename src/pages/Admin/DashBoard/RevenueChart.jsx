import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ apiData }) {
  return (
    <div>
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
