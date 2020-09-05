import React, { Component } from "react";
//import Title from "./dashboard/Title";
//import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

class Policy extends Component {
  render() {
    return (
      <div>
        <section className="policies">
          <h6>Complaints</h6>
          <p>
            Murdoch University strives for excellence in its dealings with staff, students and the broader community.
            </p>
          <br />
          <p>
            However, on occasion we receive negative feedback or people express dissatisfaction or displeasure with an experience by lodging a complaint.
            </p>
          <br />
          <p>
            At Murdoch, we are committed to ensuring all complaints or grievances are handled effectively and efficiently via our <i><a href="https://goto.murdoch.edu.au/ComplaintsManagementPolicy">Complaints Management Policy</a></i>, with the feedback assisting us in continually improving our performance. If you are not happy with the final outcome, you can also take your complaint to an <a href="http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/External-avenues/">external agency</a>.
            </p>
          <br />
          <p>
            Please note that a <b><i>complaint</i></b> is different to an <i><a href="http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/Student-appeals/Appeals-considered/">appeal</a></i>, which is a formal request to reconsider an official academic or administrative decision.
            </p>
          <br />
          <h6>Policy</h6>
          <p>
            Throughout your journey at Murdoch there may be times when you are
            not happy with the situation you find yourself in. There are
            policies, procedures and guidelines in place to make sure that no
            matter what your circumstances you will find there is always someone
            you can refer to for guidance.
          </p>
          <br />
          <p><i>Murdoch University’s complaint handling process is based on the principles of effective complaints handling, and the International Standard on Complaints Handling ISO:10002.</i></p>
          <br />
          <br />
          <h1 style={{ color: "black" }}>Have a question? Talk to us</h1>
          <article key={1} className="policy">
            <span><a href="tel:+61 8 9360 6000">+61 8 9360 6000</a></span>
            <h6>Opening hours: 8am - 8pm</h6>
          </article>
        </section>
      </div >
    );
  }
}

export default Policy;
