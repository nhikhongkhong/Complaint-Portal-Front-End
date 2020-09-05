import React from "react";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';

import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Stakeholder from "../components/Stakeholder";
import Policy from "../components/Policy";
import Copyright from "../components/dashboard/Copyright";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Hero>
        <Banner title="Murdoch Complaint Portal" subtitle="File a complaint as">
          <Link
            to={{
              pathname: "/complaint",
              state: {
                type: "student"
              }
            }}
            className="btn-primary"
          >
            Student
          </Link>
          <Link
            to={{
              pathname: "/complaint",
              state: {
                type: "staff"
              }
            }}
            className="btn-primary"
          >
            Staff
          </Link>
          <Link
            to={{
              pathname: "/complaint",
              state: {
                type: "public"
              }
            }}
            className="btn-primary"
          >
            Public
          </Link>
          <Link
            to={{
              pathname: "/complaint",
              state: {
                type: "anonymous"
              }
            }}
            className="btn-primary"
          >
            Anonymous
          </Link>
        </Banner>
      </Hero>
      <Policy />
      <Stakeholder />
      <Box m={1}>
        <Copyright />
      </Box>
    </React.Fragment>
  );
};

export default Home;
