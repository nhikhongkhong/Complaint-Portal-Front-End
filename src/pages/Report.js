import React from "react"; //, { useState, useEffect, createContext }
import clsx from "clsx";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Copyright from "../components/dashboard/Copyright";
//import Chart from "../components/dashboard/Chart";
import BarChartLastWeek from "../components/dashboard/Charts/BarChartLastWeek";
import TicketTypeBarChart from "../components/dashboard/Charts/TicketTypeBarChart";
import CategoryAreaChart from "../components/dashboard/Charts/CategoryRadarChart";
import CategoryTable from "../components/dashboard/Charts/CategoryTable";
import PieChart from "../components/dashboard/Charts/PieChart";
import LineChartLastMonth from "../components/dashboard/Charts/LineChartLastMonth";
//import Cardd from "../components/dashboard/CardDate";
import CardStatistic from "../components/dashboard/CardStatistic";
import CardGenerate from "../components/dashboard/CardGenerate";

//import Complainant from "../components/dashboard/Complainant";
import DashboardWidget from "../components/dashboard/DashboardWidget";
import DashboardBar from "../components/dashboard/DashboardBar";
import useStyles from "../components/dashboard/Theme";
//import { ComplainantProvider } from "../context";
import { TicketProvider } from "../context";
import Button from "@material-ui/core/Button";
import GenerateData from "./GenerateData";

// eslint-disable-next-line no-extend-native
Date.prototype.getWeekOfMonth = function () {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
};

// investigator filter
// var investigatorFilter = (tickets, name) => {
//   return tickets.filter(
//     ticket => ticket.assignedEmail != null && ticket.assignedEmail.name === name
//   );
// };

// stakeholder type filter
// var typeFilter = (tickets, type) => {
//   return tickets.filter(ticket => ticket.type != null && ticket.type === type);
// };

//status filter
// var statusFilter = (tickets, status) => {
//   return tickets.filter(
//     ticket => ticket.status != null && ticket.status === status
//   );
// };

export default function Report(props) {
  const tickets = props.location.state.tickets;
  const daysInfo = GenerateData.daysInfo(tickets);

  // finished tickets
  const finishedTickets = tickets.filter(
    ticket => ticket.status === "finished"
  );

  // invalid tickets
  const invalidTickets = tickets.filter(ticket => ticket.status === "invalid");

  // closed tickets
  const closedTickets = tickets.filter(ticket => ticket.status === "closed");

  // pie data (tickets by investigator)
  const pieData = GenerateData.investigator(tickets);

  // category radar data
  const category = GenerateData.category(tickets);

  // bar data (tickets by stakeholder type)
  const typeBarData = GenerateData.type(tickets);

  const classes = useStyles();
  console.log(daysInfo);
  const [open, setOpen] = React.useState(true);
  const [fromDate, setFromdDate] = React.useState(
    daysInfo.from != Infinity ? new Date(daysInfo.from) : new Date()
  );
  const [toDate, setToDate] = React.useState(
    daysInfo.to != -Infinity ? new Date(daysInfo.to) : new Date()
  );
  const [data, setData] = React.useState(tickets);

  const handleFromDateChange = date => {
    setFromdDate(date);
  };
  const handleToDateChange = date => {
    setToDate(date);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // generate data button handle
  const handleGenerate = () => {
    const ticketsFilter = GenerateData.timeRange(fromDate, toDate, tickets);
    setData(ticketsFilter);
    console.log(ticketsFilter);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const bigPaper = clsx(classes.paper, classes.bigHeight);
  //const charts = ["bar chart", "pie chart", "line chart"];

  // last month insight
  const month = new Date().getMonth();
  const lastMonth = GenerateData.monthInsight(tickets, month - 1);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashboardBar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        classes={classes}
      />
      <TicketProvider
        user={
          props.location.state !== undefined ? props.location.state.email : ""
        }
      >
        <DashboardWidget
          handleDrawerClose={handleDrawerClose}
          open={open}
          classes={classes}
          email={
            props.location.state !== undefined ? props.location.state.email : ""
          }
          role={
            props.location.state !== undefined ? props.location.state.role : ""
          }
        />
      </TicketProvider>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
              <Paper className={fixedHeightPaper}>
                <CardStatistic
                  total={tickets.length}
                  finished={finishedTickets.length}
                  invalid={invalidTickets.length}
                  closed={closedTickets.length}
                />
              </Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
              <Paper className={fixedHeightPaper}>
                <Cardd />
              </Paper>
            </Grid> */}
            <Grid item xs={12} sm={12} md={5}>
              <Paper className={fixedHeightPaper}>
                <TicketTypeBarChart data={typeBarData} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <PieChart data={pieData} />
              </Paper>
            </Grid>
            {/* Last week */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={bigPaper}>
                <BarChartLastWeek data={GenerateData.lastWeek(tickets)} />
              </Paper>
            </Grid>
            {/* Last month */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={bigPaper}>
                <LineChartLastMonth data={lastMonth} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={bigPaper}>
                <CategoryAreaChart data={category} />
              </Paper>
            </Grid>
            {/* generate data */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={bigPaper}>
                <CategoryTable />
              </Paper>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                container
                direction="row"
                spacing={2}
              >
                <Grid item xs>
                  <KeyboardDatePicker
                    style={{ marginRight: 20 }}
                    disableFuture={true}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-closed-inline"
                    label="From"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    disableFuture={true}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-closed-inline"
                    label="To"
                    value={toDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                  <br />
                  <br />
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={handleGenerate}
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Paper>
                  <CardGenerate from={fromDate} to={toDate} tickets={data} />
                </Paper>
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
