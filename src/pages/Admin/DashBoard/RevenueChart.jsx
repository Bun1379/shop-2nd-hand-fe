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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Doanh thu: ${context.raw.toLocaleString('vi-VN')} đ`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString('vi-VN') + ' đ';
          }
        }
      }
    }
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <Line
        data={{
          labels: apiData.dates,
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: apiData.revenues,
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: "rgba(75,192,192,1)",
              tension: 0.4,
              pointBackgroundColor: 'rgba(75,192,192,1)',
              pointBorderColor: '#fff',
              pointHoverRadius: 6,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: '#fff',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default RevenueChart;
