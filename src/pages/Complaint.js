import React from "react";
import Hero from "../components/Hero";
import MainForm from "../components/MainForm";
import Navbar from "../components/Navbar";
import Copyright from "../components/dashboard/Copyright"
import Box from '@material-ui/core/Box';
const Complaint = props => {
  return (
    <>
      <Navbar />
      <Hero hero="complaintHero">
        <MainForm
          type={props.location.state.type}
          history={props.history}
          className="main-form"
        />
      </Hero>
      <Box m={1}>
        <Copyright />
      </Box>
    </>
  );
};

export default Complaint;
