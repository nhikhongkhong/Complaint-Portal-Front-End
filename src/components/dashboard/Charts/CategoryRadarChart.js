import React, { PureComponent } from "react";
import {
  ComposedChart,
  //Line,
  //Area,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import CategoryMap from "../../Category";
import Title from "../Title";

// const style = {
//   top: 0,
//   left: 350,
//   lineHeight: "24px"
// };

export default class Example extends PureComponent {
  render() {
    let data = this.props.data;
    data.forEach(e => {
      e.name = CategoryMap.get(e.category);
    });
    return (
      <React.Fragment>
        <Title>Tickets by Category</Title>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={this.props.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category">
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle" }}
              >
                Category
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar
              name="Number of ticket(s)"
              dataKey="tickets"
              barSize={20}
              fill="#c00"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
