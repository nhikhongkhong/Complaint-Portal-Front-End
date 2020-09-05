import React, { Component } from "react";
import {
  FaUserSecret,
  FaUserTie,
  FaUserGraduate,
  FaUserFriends
} from "react-icons/fa";

class Services extends Component {
  state = {
    stakeholders: [
      {
        icon: <FaUserFriends />,
        title: "Public member",
        //http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/Complaints/Public-complaints/
        info: "Any member of the public or any member of staff or of the student body whose complaint is not related to their employment or enrolment at the University may make a complaint as a member of the public."
      },
      {
        icon: <FaUserGraduate />,
        title: "Student",
        //http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/Complaints/Student-complaints/
        info: "Before lodging a formal complaint or appeal you must first have exhausted all available informal proceedings associated with the complaint or appeal procedures.\n\nTo start with, take a moment to think about the problem or concern that has caused you dissatisfaction. It is often a good idea to talk to someone neutral first, as this may help you determine what your options are. It may also provide a clearer perspective, as sometimes emotions cloud our perspective."
      },
      {
        icon: <FaUserTie />,
        title: "Staff",
        //http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/Complaints/Staff-complaints/
        info: "The following provides information for staff members who are considering making a complaint to the University."
      },
      {
        icon: <FaUserSecret />,
        title: "Anonymous",
        //http://our.murdoch.edu.au/University-Secretarys-Office/Governance-Services/Complaints/Student-complaints/Making-a-complaint/Anonymous-complaints/
        info: "The Student Complaints Management Procedure allows students to submit an anonymous complaint, which may be accepted and investigated if:\n" +
          "it is deemed to be of a serious nature;\n" +
          "it contains or points to good evidence of misconduct, error or some other significant institutional flaw;\n" +
          "or is so required by law."
      }
    ]
  };
  render() {
    return (
      <div>
        <section className="stakeholders">
          <h2>Audience</h2>
          <div className="stakeholders-center">
            {this.state.stakeholders.map((item, index) => {
              return (
                <article key={index} className="stakeholder">
                  <span>{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.info}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default Services;
