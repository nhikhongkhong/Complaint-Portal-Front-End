import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Error = props => {
  var title = "Page not found";
  if (
    props.location.state !== undefined &&
    props.location.state.connect !== undefined
  )
    title = "Cannot connect to server";
  return (
    <>
      <Navbar />
      <Hero>
        <Banner title="404" subtitle={title}>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </Banner>
        >
      </Hero>
    </>
  );
};

export default Error;
