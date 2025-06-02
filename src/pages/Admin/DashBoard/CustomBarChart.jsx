import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const CustomBarChart = ({ data }) => {
  const formatData = Object.keys(data).map((key) => {
    return {
      name: key,
      quantity: data[key],
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: 0, color: '#8884d8' }}>
            Số lượng: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={formatData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#888' }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#888' }}
            axisLine={{ stroke: '#888' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="quantity"
            fill="#8884d8"
            name="Số lượng"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
