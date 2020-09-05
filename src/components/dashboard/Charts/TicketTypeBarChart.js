import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  //Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from "recharts";
import Title from "../Title";

export default class Example extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Title>All Time</Title>
        <ResponsiveContainer>
          <BarChart
            data={this.props.data}
            margin={{
              top: 16,
              right: 16,
              left: 24,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle" }}
              >
                Tickets (/type)
              </Label>
            </YAxis>{" "}
            <Tooltip />
            <Legend />
            <Bar dataKey="Valid" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Invalid" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
