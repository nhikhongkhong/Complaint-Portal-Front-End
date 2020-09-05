import React, { PureComponent } from "react";
import {
  BarChart,
  Label,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Title from "../Title";

export default class Chart extends PureComponent {
  render() {
    const { data, insight } = this.props.data;
    return (
      <React.Fragment>
        <Title>Last Week</Title>
        <ResponsiveContainer>
          <BarChart
            width={600}
            height={300}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle" }}
              >
                Tickets (/day)
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="tickets" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {this.props.insight === false ? (
          ""
        ) : (
          <div>
            <h6>Insights</h6>
            <li>
              Total Tickets: <b>{insight.totalTicket}</b>
            </li>
            <li>
              Average Tickets:{" "}
              <b>{(insight.totalTicket / 7).toFixed(2)} ticket(s)/day</b>
            </li>
            <li>
              <b>{insight.maxDay}</b> was the busiest day with{" "}
              <b>{insight.maxDayValue} new tickets</b>.
            </li>
            <li>
              <span style={{ color: "red" }}>
                Based on last week's data, your busiest days may fall around{" "}
                <b>{insight.maxDay}</b>.
              </span>
            </li>
          </div>
        )}
      </React.Fragment>
    );
  }
}
