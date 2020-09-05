import React from "react"; //, { useState, useEffect, createContext }
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/dashboard/Chart";
import CardWelcome from "../components/dashboard/CardWelcome";
//import CardDate from "../components/dashboard/CardDate";
import Complainant from "../components/dashboard/Complainant";
import Tickets from "../components/dashboard/Tickets";
import DashboardWidget from "../components/dashboard/DashboardWidget";
import DashboardBar from "../components/dashboard/DashboardBar";
import useStyles from "../components/dashboard/Theme";
import Copyright from "../components/dashboard/Copyright";
import { ComplainantProvider } from "../context";
import { TicketProvider } from "../context";
import { withRouter } from "react-router";
//import GenerateData from "./GenerateData";

export default withRouter(function Dashboard(props) {
  // console.log("the email of: ", props.location.state.email);
  console.log("the role of: ", props.location.state.role);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
          name={
            props.location.state !== undefined ? props.location.state.name : ""
          }
        />
      </TicketProvider>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Welcome Card */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <CardWelcome
                  user={props.location.state.email}
                  role={props.location.state.role}
                  name={props.location.state.name}
                />
              </Paper>
            </Grid>
            {/* Recent Users */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ComplainantProvider>
                  <Complainant />
                </ComplainantProvider>
              </Paper>
            </Grid>
            {/* Recent Tickets */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TicketProvider
                  user={
                    props.location.state !== undefined
                      ? props.location.state.email
                      : ""
                  }
                >
                  <Tickets />
                </TicketProvider>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
});
