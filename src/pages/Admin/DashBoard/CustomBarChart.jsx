import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const CustomBarChart = ({ data }) => {
  const formatData = Object.keys(data).map((key) => {
    return {
      name: key,
      quantity: data[key],
    };
  });
  console.log(formatData);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={formatData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={100}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#8884d8" name={"Số lượng"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
