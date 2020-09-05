import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Complaint from "./pages/Complaint";
import Anonymous from "./pages/Anonymous";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import DashboardLogin from "./pages/DashboardLogin";
import ViewTicket from "./pages/ViewTicket";
import Report from "./pages/Report";
import { Route, Router, Switch } from "react-router-dom";
import history from "./pages/history";
//import ProtectedRoute from "./ProtectedRoute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

toast.configure();

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#c00" },
    secondary: { A400: "#336b87" }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/complaint" component={Complaint} />
            <Route exact path="/complaint-anonymous" component={Anonymous} />
            {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} /> */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard-login" component={DashboardLogin} />
            <Route exact path="/dashboard/view-ticket" component={ViewTicket} />
            <Route exact path="/dashboard/report" component={Report} />
            <Route exact path="/error" component={Error} />
            <Route component={Error} />
          </Switch>
        </Router>
      </>
    </MuiThemeProvider>
  );
}

export default App;
