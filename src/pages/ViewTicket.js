import React from "react"; //, { useState, useEffect, createContext } 
//import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
//import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Copyright from "../components/dashboard/Copyright";
//import Complainant from "../components/dashboard/Complainant";
//import Tickets from "../components/dashboard/Tickets";
import DashboardWidget from "../components/dashboard/DashboardWidget";
import DashboardBar from "../components/dashboard/DashboardBar";
import TicketFilter from "../components/dashboard/TicketFilter";
import useStyles from "../components/dashboard/Theme";
//import { ComplainantProvider } from "../context";
import { TicketProvider } from "../context";

export default function ViewTicket(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Paper className={classes.paper}>
            <TicketProvider user={props.location.state.email}>
              <TicketFilter
                role={props.location.state.role}
                user={props.location.state.email}
              />
            </TicketProvider>
          </Paper>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
