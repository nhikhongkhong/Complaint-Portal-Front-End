import React from "react"; //, { useState, useEffect }
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Category from "../../Category";
import Title from "../Title";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    whiteSpace: "nowrap",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  table: {
    marginTop: theme.spacing(1)
  }
}));

export default function CategoryTable() {
  const classes = useStyles();

  var rows = [];
  Category.forEach((value, key) => {
    rows.push(
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  });

  console.log(rows);
  return (
    <Paper className={classes.paper}>
      <Title>Category Description</Title>

      <Table
        size="small"
        aria-label="a dense table"
        className={classes.table}
        striped="true"
        hover="true"
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <b>Category code</b>
            </TableCell>
            <TableCell>
              <b>Descripton</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  );
}
