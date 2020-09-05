import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Title from "../Title";

export default class Chart extends PureComponent {
  render() {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const data = this.props.data;
    let display = false;
    data.forEach(e => {
      if (e.value > 0) display = true;
    });
    if (display)
      return (
        <React.Fragment>
          <Title>Tickets Per Investigator</Title>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                fill="#8884d8"
                label
                legendType="square"
              >
                {this.props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </React.Fragment>
      );
    else
      return (
        <>
          <Title>Tickets Per Investigator</Title>
          <b>There is no data available!</b>
        </>
      );
  }
}
