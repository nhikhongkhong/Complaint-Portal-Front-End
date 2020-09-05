import React from "react"; //, { PureComponent } 
import {
  LineChart,
  Label,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import Title from "../Title";

export default function Chart(props) {
  const { data, insight } = props.data;
  return (
    <React.Fragment>
      <Title>Last Month</Title>
      <ResponsiveContainer>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Tickets (/day of month)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          {/* <ReferenceLine
          x={data[insight.hightestDay].day}
          stroke="red"
          label="Highest tickets day"
        /> */}
          <ReferenceLine
            y={insight.highestValue}
            label="Highest number"
            stroke="red"
          />
          <Line type="monotone" dataKey="tickets" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <h6>Insights</h6>
        <li>
          Total Tickets: <b>{insight.totalTickets}</b>
        </li>
        <li>
          Average Tickets: <b>{insight.averageDay.toFixed(2)} ticket(s)/day</b>
        </li>
        <li>
          <b>{data[insight.hightestDay].day}</b> had the most submitted tickets:{" "}
          <b>{insight.highestValue} tickets</b>
        </li>
        <li>
          <span style={{ color: "red" }}>Based on last month's data</span>
        </li>
      </div>
    </React.Fragment>
  );
}
