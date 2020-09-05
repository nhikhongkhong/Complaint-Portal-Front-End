import React, { Component } from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";

export class Success extends Component {
  render() {
    return (
      <React.Fragment>
        <Banner
          title="Thank You"
          subtitle={
            this.props.type === "anonymous"
              ? "Your complaint will be handled anonymously."
              : "You will receive an email with further instructions."
          }
        >
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </Banner>
      </React.Fragment>
    );
  }
}

export default Success;
