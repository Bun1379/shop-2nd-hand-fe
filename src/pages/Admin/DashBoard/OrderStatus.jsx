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
  const [apiData, setApiData] = useState({});
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 15,
          boxWidth: 15
        }
      },
      title: {
        display: true,
        text: 'Thống kê tỷ lệ trạng thái đơn hàng',
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', position: 'relative' }}>
      <Pie
        data={{
          labels: Object.keys(apiData),
          datasets: [
            {
              data: Object.values(apiData),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 2,
              hoverOffset: 15
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default OrderStatus;
