import React, { createContext } from "react";
import { useFetch } from "./hooks";

export const ComplainantContext = createContext();
export const TicketContext = createContext();
export const InvestigatorContext = createContext();

export const ComplainantProvider = props => {
  const [complainants, loading] = useFetch("/api/users");
  // console.log("complainters");
  // console.log(complainters);
  return (
    <ComplainantContext.Provider value={complainants}>
      {props.children}
    </ComplainantContext.Provider>
  );
};

// export const InvestigatorProvider = props => {
//   const [investigators, loading] = useFetch("/api/investigators");
//   return (
//     <InvestigatorContext.Provider value={investigators}>
//       {props.children}
//     </InvestigatorContext.Provider>
//   );
// };

export const TicketProvider = props => {
  console.log(props.user);
  const [tickets, loading] = useFetch(`/api/tickets/?user=${props.user}`);
  const [investigators, load] = useFetch("/api/investigators");
  console.log("investigators: ", investigators);
  return (
    <TicketContext.Provider
      value={{ tickets: tickets, investigators: investigators }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

// const PersonContext = React.createContext();
// export default class PersonProvider extends Component {
//   state = {
//     firstName: "",
//     lastName: "",
//     email: ""
//   };

//   // Get data from server
//   getData = async () => {
//     try {
//       let firstName, lastName, email;
//       fetch("http://localhost:3001/api/users")
//         .then(res => res.json())
//         .then(res => {
//           firstName = res.firstName;
//           lastName = res.lastName;
//           email = res.email;
//         });
//       fetch("http://localhost:3001/api/complaints")
//         .then(res => res.json())
//         .then(res => console.log(res));

//       this.setState({
//         firstName,
//         lastName,
//         email
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   componentDidMount() {
//     this.getData();
//   }

//   render() {
//     return (
//       <PersonContext.Provider
//         value={{
//           ...this.state
//         }}
//       >
//         {this.props.children}
//       </PersonContext.Provider>
//     );
//   }
// }

// const PersonConsumer = PersonContext.Consumer;
// export { PersonProvider, PersonConsumer, PersonContext };
