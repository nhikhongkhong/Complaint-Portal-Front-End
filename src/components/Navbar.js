import React, { Component } from "react";
import logo from "../images/murdoch-logo-white.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";
//import IconButton from "@material-ui/core/IconButton";
//import SvgIcon from '@material-ui/core/SvgIcon';

export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-hearder">
            <Link to="/">
              <img src={logo} alt="Murdoch Complaint Portal home" />
            </Link>
            <button
              name="Home"
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <a href="https://www.murdoch.edu.au/" alt="Murdoch University home" target="_blank" rel="noopener noreferrer">Murdoch University</a>
            </li>
            {/* <li>
              <a href="https://policy.murdoch.edu.au/dotNet/documents/?docid=2196&public=true" alt="Complaints Management Policy">Complaints Management Policy</a>
            </li> */}
            <li>
              <a href="/dashboard-login" alt="Login">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
