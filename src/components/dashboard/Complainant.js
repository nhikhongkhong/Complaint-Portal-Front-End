import React from "react";
import { ComplainantContext } from "../../context";
import { useContext } from "react";
import MUIDataTable from "mui-datatables";
//import categoryMap from "../Category";

//import { TicketContext } from "../../context";

export default function Tickets() {
  const complaints = useContext(ComplainantContext);
  const rows = [...complaints];

  const columns = [
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Email" },
    { name: "Type" }
  ];

  const data = rows
    .reverse()
    .map(row => [
      row.firstName,
      row.lastName,
      row.email,
      row.type != null ? row.type : "none"
    ]);

  const options = {
    selectableRows: "none",//false,
    selectableRowsHeader: "none"//false
  };

  return (
    <MUIDataTable
      title={"Recent Complainants"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
