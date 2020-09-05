import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Button from "@material-ui/core/Button";
// import FormTheme from "./FormTheme";

// const regName = "^[a-zA-Z ]+$";
// const regMail = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

export class FormUserDetails extends Component {
  state = {
    lastName: { err: false, helpText: "", value: this.props.values.lastName },
    email: { err: false, helpText: "", value: this.props.values.email },
    errMess: ""
  };

  // input field validation
  // invalid = (name, field) => {
  //   let err = false;
  //   switch (field) {
  //     case "firstName":
  //       console.log("invalidfieldcheck: " + name);
  //       err = !name.match(regName) || name === "";
  //       this.setState({
  //         firstName: {
  //           err: err,
  //           helpText: err ? "Invalid first name" : "",
  //           value: name
  //         }
  //       });
  //       return err;
  //     case "lastName":
  //       err = !name.match(regName) || name === "";
  //       this.setState({
  //         lastName: {
  //           err: err,
  //           helpText: err ? "Invalid last name" : "",
  //           value: name
  //         }
  //       });
  //       return err;
  //     case "email":
  //       err = !name.match(regMail) || name === "";
  //       this.setState({
  //         email: {
  //           err: err,
  //           helpText: err ? "Invalid email address" : "",
  //           value: name
  //         }
  //       });
  //       return err;
  //     default:
  //   }
  // };

  // handle continue button
  continue = e => {
    e.preventDefault();
    if (!this.handleValidation()) this.props.nextStep();
    else this.setState({ errMess: "You need to fill the form first" });
  };

  // handle validation : false if one of three field invalid
  // handleValidation() {
  //   return (
  //     this.invalid(this.props.values.firstName, "firstName") ||
  //     this.invalid(this.props.values.lastName, "lastName") ||
  //     this.invalid(this.props.values.email, "email")
  //   );
  // }

  render() {
    const { values, handleChange, handleValidation, invalid } = this.props;
    // console.log("Formuserdetails");
    console.log(this.props);
    // console.log(values)
    // console.log(handleChange);
    // console.log(handleValidation);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Contact details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              autoFocus={values.firstName.value === ""}
              onChange={e => {
                if (!invalid(e.target.value, "firstName")) {
                  handleChange("firstName", e);
                  const result = !handleValidation();
                  console.log("fname check: " + result);
                  handleValidation(result);
                } else {
                  handleValidation(false);
                }
              }}
              defaultValue={values.firstName.value}
              //style={styles.textfield}
              error={values.firstName.err}
              helperText={values.firstName.helpText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              error={values.lastName.err}
              helperText={values.lastName.helpText}
              onChange={e => {
                if (!invalid(e.target.value, "lastName")) {
                  handleChange("lastName", e);
                  const result = !handleValidation();
                  console.log("lname check: " + result);
                  handleValidation(result);
                } else {
                  handleValidation(false);
                }
              }}
              defaultValue={values.lastName.value}
            //style={styles.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email address"
              fullWidth
              autoComplete="email"
              variant="outlined"
              error={values.email.err}
              helperText={values.email.helpText}
              onChange={e => {
                if (!invalid(e.target.value, "email")) {
                  handleChange("email", e);
                  const result = !handleValidation();
                  console.log("email check: " + result);
                  handleValidation(result);
                } else {
                  handleValidation(false);
                }
              }}
              defaultValue={values.email.value}
            //style={styles.textfield}
            />
          </Grid>
        </Grid>
        <p style={{ color: "red" }}>{values.errMess}</p>
      </React.Fragment>
    );
  }
}

// const styles = {
//   button: { margin: 15, color: "white" }
//   //textfield: { margin: 15 }
// };

export default FormUserDetails;
