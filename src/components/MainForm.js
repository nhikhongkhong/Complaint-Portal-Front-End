import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormUserDetails from "./FormUserDetails";
import FormComplaintDetails from "./FormComplaintDetails";
import FormConfirm from "./FormConfirm";
import FormSuccess from "./FormSuccess";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
//import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = (type) => {
  if (type !== "anonymous") return ["Contact details", "Complaint details", "Review your details"];
  else return ["Complaint details", "Review your details"];
}

function getStepContent(
  step,
  state,
  props,
  nextStep,
  prevStep,
  handleChange,
  invalid,
  handleValidation,
  values
) {
  // console.log("getStepContent");
  // console.log(step);
  // console.log(step.values);
  // console.log(step.state);
  switch (step.step) {
    case 0:
      return (
        <FormUserDetails
          nextStep={step.nextStep}
          invalid={step.invalid}
          handleChange={step.handleChange}
          handleValidation={step.handleValidation}
          values={step.values}
        />
      );
    case 1:
      return (
        <FormComplaintDetails
          nextStep={step.nextStep}
          prevStep={step.prevStep}
          invalid={step.tikcetInvalid}
          handleChange={step.handleChange}
          values={step.values}
        />
      );
    case 2:
      return (
        <FormConfirm
          nextStep={step.nextStep}
          prevStep={step.prevStep}
          handleChange={step.handleChange}
          values={step.values}
          props={step.values}
        />
      );
    // case 3:
    //   return <FormSuccess type={state.type} />;
    default:
      //return;
      throw new Error("Unknown step");
  }
}

const Display = (
  step,
  state,
  props,
  nextStep,
  prevStep,
  handleChange,
  contactValidation,
  handleValidation,
  invalid,
  history,
  tikcetInvalid,
  values
) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // console.log("Display");
  // console.log(step);
  // console.log(activeStep);
  // console.log(step.nextStep);
  // console.log(step.prevStep);
  // console.log(step.handleChange);
  // console.log(values)

  const handleNext = () => {
    // Validate
    //  console.log("handleNext: validate: " + step.state.isValidated);
    //const isValidated = step.handleValidation();
    console.log(step);
    switch (step.step) {
      case 0:
        if (!step.contactValidation()) {
          setActiveStep(activeStep + 1);
          step.nextStep();
        }
        break;
      case 1:
        if (!step.ticketValidation()) {
          setActiveStep(activeStep + 1);
          step.nextStep();
        }
        break;
      default:
        const values = {
          firstName: step.state.firstName.value,
          lastName: step.state.firstName.value,
          email: step.state.email.value,
          title: step.state.title.value,
          content: step.state.content.value,
          category: step.state.category.value,
          suggestion: step.state.suggestion.value,
          type: step.state.type
        };
        console.log(values);
        fetch("/api/submit-ticket", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })
          .then(res => {
            if (res.ok) {
              setActiveStep(activeStep + 1);
              step.nextStep();
            } else {
              console.log("Fetch failed");
              step.history.push({
                pathname: "/error",
                state: {
                  connect: false
                }
              });
            }
          })
          .catch(err => {
            console.log("error", err);
            step.history.push({
              pathname: "/error",
              state: {
                connect: false
              }
            });
          });
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    step.prevStep();
  };

  const handleHome = () => {
    step.props.history.push("/");
  };

  return (
    <React.Fragment>
      <CssBaseline>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              File Complaint
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps(step.props.type).map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps(step.props.type).length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for filing your complaint.
                  </Typography>
                  {step.props.type !== "anonymous" && (
                    <Typography variant="subtitle1">
                      We have emailed your ticket confirmation, and will send you an update when your ticket has resolved.
                  </Typography>)}
                  {step.props.type === "anonymous" && (
                    <Typography variant="subtitle1">
                      Your ticket will be handled anonymously.
                  </Typography>)}
                  <Button
                    onClick={handleHome}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Return Home
                  </Button>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {/* {getStepContent(activeStep)} */}
                    {getStepContent(
                      step,
                      state,
                      props,
                      nextStep,
                      prevStep,
                      handleChange,
                      values,
                      invalid,
                      tikcetInvalid
                    )}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                      </Button>
                      )}
                      {activeStep === 0 && (
                        <Button onClick={handleHome} className={classes.button}>
                          Cancel
                      </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps(step.props.type).length - 1
                          ? "File complaint"
                          : "Next"}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
        </main>
      </CssBaseline>
    </React.Fragment>
  );
};

const regName = "^[a-zA-Z ]+$";
const regMail =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

export class MainForm extends Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.contactValidation = this.contactValidation.bind(this);
    this.ticketValidation = this.ticketValidation.bind(this);
    this.invalid = this.invalid.bind(this);
    this.tikcetInvalid = this.tikcetInvalid.bind(this);
  }

  state = {
    type: this.props.type,
    step: this.props.type !== "anonymous" ? 0 : 1,
    //step: 0,
    firstName: { err: false, helpText: "", value: "" },
    lastName: { err: false, helpText: "", value: "" },
    email: { err: false, helpText: "", value: "" },
    title: { err: false, helpText: "", value: "" },
    category: { err: false, helpText: "", value: "" },
    content: { err: false, helpText: "", value: "" },
    errMess: "",
    suggestion: "",
    isValidated: false
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = (input, e) => {
    this.setState({
      [input]: { err: false, helpText: "", value: e.target.value }
    });
    // console.log(input);
  };

  handleValidation = valid => {
    const { isValidated } = this.state;
    this.setState({
      isValidated: valid
    });
    // console.log("MainForm: " + isValidated);
  };

  // handle validation : false if one of three field invalid
  contactValidation = () => {
    const invalid =
      this.invalid(this.state.firstName.value, "firstName") ||
      this.invalid(this.state.lastName.value, "lastName") ||
      this.invalid(this.state.email.value, "email");
    return invalid;
  };

  // input contact field validation
  invalid = (name, field) => {
    let err = false;
    switch (field) {
      case "firstName":
        console.log("invalidfieldcheck: " + name);
        err = !name.match(regName) || name === "";
        this.setState({
          firstName: {
            err: err,
            helpText: err ? "Invalid first name" : "",
            value: name
          }
        });
        return err;
      case "lastName":
        err = !name.match(regName) || name === "";
        this.setState({
          lastName: {
            err: err,
            helpText: err ? "Invalid last name" : "",
            value: name
          }
        });
        return err;
      case "email":
        err = !name.match(regMail) || name === "";
        this.setState({
          email: {
            err: err,
            helpText: err ? "Invalid email address" : "",
            value: name
          }
        });
        return err;
      default:
    }
  };

  // input field ticket validation
  tikcetInvalid = (name, field) => {
    let err = name === "";
    let help = "";
    switch (field) {
      case "title":
        help = "Title required";
        break;
      case "content":
        help = "Response required";
        break;
      case "category":
        help = "Selection required";
        break;
      default:
        break;
    }
    this.setState({
      [field]: {
        err: err,
        helpText: err ? help : "",
        value: name
      }
    });
    return err;
  };

  // ticket details validation, returns true if any fields are empty
  ticketValidation = () => {
    console.log(this.tikcetInvalid(this.state.title.value, "title"));
    console.log(this.tikcetInvalid(this.state.category.value, "category"));
    console.log(this.tikcetInvalid(this.state.content.value, "content"));
    const invalid =
      this.tikcetInvalid(this.state.title.value, "title") ||
      this.tikcetInvalid(this.state.category.value, "category") ||
      this.tikcetInvalid(this.state.content.value, "content");
    return invalid;
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      title,
      errMess,
      category,
      content,
      suggestion,
      type,
      isValidated
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      title,
      category,
      errMess,
      content,
      suggestion,
      type,
      isValidated
    };

    return (
      <div>
        <Display
          step={this.state.step}
          state={this.state}
          props={this.props}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          handleChange={this.handleChange}
          handleValidation={this.handleValidation}
          contactValidation={this.contactValidation}
          ticketValidation={this.ticketValidation}
          invalid={this.invalid}
          tikcetInvalid={this.tikcetInvalid}
          values={values}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default MainForm;
