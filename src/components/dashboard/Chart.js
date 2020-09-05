import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}

const data = [
  createData("Jan", 2),
  createData("Feb", 11),
  createData("Mar", 6),
  createData("Apr", 8),
  createData("May", 15),
  createData("Jun", 20),
  createData("Jul", 22),
  createData("Aug", 24),
  createData("Sep", 26),
  createData("Oct", 13),
  createData("Nov", 10),
  createData("Dec", undefined)
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Last Year</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="month" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Tickets (/monthly)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
