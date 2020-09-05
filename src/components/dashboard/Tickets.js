/* eslint-disable no-script-url */

import React from "react";
import { useContext } from "react";
import MUIDataTable from "mui-datatables";
import categoryMap from "../Category";

import { TicketContext } from "../../context";

export default function Tickets() {
  const tickets = useContext(TicketContext).tickets;
  const rows = [...tickets];

  const columns = [
    { name: "Title" },
    { name: "Category" },
    { name: "Content" },
    { name: "Suggestion" }
  ];

  const data = rows
    .reverse()
    .map(row => [
      row.title,
      categoryMap.get(row.category),
      row.content,
      row.suggestion
    ]);

  const options = {
    selectableRows: "none", // false
    selectableRowsHeader: "none" //false
  };

  return (
    <MUIDataTable
      title={"Recent Tickets"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
