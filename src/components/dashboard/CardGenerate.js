//import React, { useState, useEffect } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Generatedata from "../../pages/GenerateData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    whiteSpace: "nowrap",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  table: {
    marginTop: theme.spacing(1)
  }
}));

export default function CardGenerate(props) {
  const classes = useStyles();
  let dFrom = props.from.toJSON();
  const from = dFrom != null ? dFrom.slice(0, 10).replace(/-/g, "/") : "?";

  let dTo = props.to.toJSON();
  const to = dTo != null ? dTo.slice(0, 10).replace(/-/g, "/") : "?";

  const data = props.tickets;
  const {
    total,
    daysInfo,
    investigator,
    //maxInve,
    type,
    maxType,
    status
  } = Generatedata.createInsight(data);
  if (total === 0)
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            There is no data available
          </Typography>
        </CardContent>
      </Card>
    );
  else
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Do you know?
          </Typography>
          <Typography variant="subtitle1" color="primary" component="p">
            from {from} to {to}
          </Typography>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <span style={{ color: "blue", fontSize: 20 }}>There were</span>
                <Divider />
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>A total of </b>
                  {"    "}
                  <span style={{ color: "blue", fontSize: 25 }}>
                    {total}
                  </span>{" "}
                  tickets
                  <br />
                  <b>Over a period of </b>
                  {"    "}
                  <span style={{ color: "blue", fontSize: 25 }}>
                    {daysInfo.dayDuration}{" "}
                  </span>
                  days
                  <br />
                  <b>Averaging at </b>{" "}
                  <span style={{ color: "blue", fontSize: 25 }}>
                    {(total / daysInfo.dayDuration).toFixed(2)}{" "}
                  </span>
                  tickets per day
                  <br />
                  The <b>most common stakeholder</b> is{" "}
                  <span style={{ color: "blue", fontSize: 25 }}>
                    {type[maxType].name}
                  </span>{" "}
                  <br />
                  with{" "}
                  <span style={{ color: "blue", fontSize: 25 }}>
                    {type[maxType].Valid + type[maxType].Invalid}
                  </span>{" "}
                  tickets
                </Typography>
              </Paper>
            </Grid>
            {/*investigator*/}
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Chip label="By Investigator" color="primary" />
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
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Number of Tickets</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {investigator.map((e, index) => (
                      <TableRow key={index}>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {" "}
                          <span style={{ color: "blue", fontSize: 25 }}>
                            {e.value}{" "}
                          </span>{" "}
                          tickets
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            {/*status*/}
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Chip label="By Status" color="primary" />
                <Table
                  size="small"
                  aria-label="a dense table"
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Number of Tickets</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {status.map((e, index) => (
                      <TableRow key={index}>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {" "}
                          <span style={{ color: "blue", fontSize: 25 }}>
                            {e.value}{" "}
                          </span>{" "}
                          tickets
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <Paper className={classes.paper}>
              <span style={{ color: "blue", fontSize: 20 }}>
                By Stakeholder:{" "}
              </span>
              <Divider />
              <Typography variant="body2" color="textSecondary" component="p">
                {type.map((e, index) => (
                  <span key={index}>
                    <b>{e.name} : </b>
                    <span style={{ color: "blue", fontSize: 25 }}>
                      {e.Valid}{" "}
                    </span>{" "}
                    valid tickets and{" "}
                    <span style={{ color: "red", fontSize: 25 }}>
                      {e.Invalid}{" "}
                    </span>
                    invalid tickets
                    <br />
                  </span>
                ))}
              </Typography>
            </Paper> */}
              <Paper className={classes.paper}>
                <Chip label="By Stakeholder" color="primary" />
                <Table
                  size="small"
                  aria-label="a dense table"
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Number of Tickets</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {type.map((e, index) => (
                      <TableRow key={index}>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>
                          {" "}
                          <span style={{ color: "blue", fontSize: 25 }}>
                            {e.Valid}{" "}
                          </span>{" "}
                          valid |{" "}
                          <span style={{ color: "red", fontSize: 25 }}>
                            {e.Invalid}{" "}
                          </span>{" "}
                          invalid
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}

// function Clock(props) {
//   const [date, setDate] = useState(new Date());

//   //Replaces componentDidMount and componentWillUnmount
//   useEffect(() => {
//     var timerID = setInterval(() => tick(), 1000);

//     return function cleanup() {
//       clearInterval(timerID);
//     };
//   });

//   function tick() {
//     setDate(new Date());
//   }

//   return <span>{date.toLocaleTimeString()}</span>;
// }
