import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import FormTheme from "./FormTheme";
// import styles from "./FormStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export class FormComplaintDetails extends Component {
  // state = {
  //   title: { err: false, helpText: "", value: this.props.values.title },
  //   content: { err: false, helpText: "", value: this.props.values.content },
  //   category: { err: false, helpText: "", value: this.props.values.category },
  //   errMess: ""
  // };

  // handle back button
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  // input field validation
  // invalid = (name, field) => {
  //   let err = name === "";
  //   let help = "";
  //   switch (field) {
  //     case "title":
  //     case "content":
  //       help = "Response required";
  //       break;
  //     case "category":
  //       help = "Selection required";
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState({
  //     title: {
  //       err: err,
  //       helpText: err ? help : "",
  //       value: name
  //     }
  //   });
  //   return err;
  // };

  // handle validation
  // handleValidation() {
  //   return (
  //     this.invalid(values.title.value, "title") ||
  //     this.invalid(values.content.value, "content") ||
  //     this.invalid(values.category.value, "category")
  //   );
  // }

  // handle continue button
  continue = e => {
    e.preventDefault();
    if (!this.handleValidation()) this.props.nextStep();
    else
      this.setState({
        errMess: "Please review the form and correct the highlighted items."
      });
  };

  category = type => {
    switch (type) {
      case "student":
        return [
          <MenuItem key={0} value={"Stu1"}>
            Experience-related matters
          </MenuItem>,
          <MenuItem key={1} value={"Stu2"}>
            Arrangements for teaching/assessments
          </MenuItem>,
          <MenuItem key={2} value={"Stu3"}>
            Student Village matters (non-tenancy)
          </MenuItem>,
          <MenuItem key={3} value={"Stu4"}>
            International student matters
          </MenuItem>
        ];
      case "staff":
        return [
          <MenuItem key={0} value={"Sta1"}>
            Code of Ethics and Code of Conduct
          </MenuItem>,
          <MenuItem key={1} value={"Sta2"}>
            Violence, aggression and bullying in the workplace
          </MenuItem>,
          <MenuItem key={2} value={"Sta3"}>
            Unlawful discrimination and harassment
          </MenuItem>,
          <MenuItem key={3} value={"Sta4"}>
            Personal relationships between staff members
          </MenuItem>,
          <MenuItem key={4} value={"Sta5"}>
            Responsible conduct of research
          </MenuItem>,
          <MenuItem key={5} value={"Sta6"}>
            General grievances
            </MenuItem>,
          <MenuItem key={6} value={"Sta7"}>
            Dispute settlement
                  </MenuItem>,
          <MenuItem key={7} value={"Sta8"}>
            Equal opportunity grievance management
                  </MenuItem>,
          <MenuItem key={8} value={"Sta9"}>
            Resolving workplace health and safety issues
                  </MenuItem>,
          <MenuItem key={9} value={"Sta10"}>
            Research misconduct
                  </MenuItem>
        ];
      case "public":
        return [
          <MenuItem key={0} value={"Stu1"}>
            Experience-related matters
          </MenuItem>,
          <MenuItem key={1} value={"Sta3"}>
            Unlawful discrimination and harassment
          </MenuItem>,
          <MenuItem key={2} value={"Sta6"}>
            General grievances
          </MenuItem>,
          <MenuItem key={3} value={"Sta7"}>
            Dispute settlement
          </MenuItem>
        ];
      default:
        let index = 0;
        return [
          <MenuItem key={index++} value={"Stu1"}>
            Experience-related matters
          </MenuItem>,
          <MenuItem key={index++} value={"Stu2"}>
            Arrangements for teaching/assessments
          </MenuItem>,
          <MenuItem key={index++} value={"Stu3"}>
            Student Village matters (non-tenancy)
          </MenuItem>,
          <MenuItem key={index++} value={"Stu4"}>
            International student matters
          </MenuItem>,
          <MenuItem key={index++} value={"Sta1"}>
            Code of Ethics and Code of Conduct
          </MenuItem>,
          <MenuItem key={index++} value={"Sta2"}>
            Violence, aggression and bullying in the workplace
          </MenuItem>,
          <MenuItem key={index++} value={"Sta3"}>
            Unlawful discrimination and harassment
          </MenuItem>,
          <MenuItem key={index++} value={"Sta4"}>
            Personal relationships between staff members
          </MenuItem>,
          <MenuItem key={index++} value={"Sta5"}>
            Responsible conduct of research
          </MenuItem>,
          <MenuItem key={index++} value={"Sta6"}>
            General grievances
          </MenuItem>,
          <MenuItem key={index++} value={"Sta7"}>
            Dispute settlement
          </MenuItem>,
          <MenuItem key={index++} value={"Sta8"}>
            Equal opportunity grievance management
          </MenuItem>,
          <MenuItem key={index++} value={"Sta9"}>
            Resolving workplace health and safety issues
          </MenuItem>,
          <MenuItem key={index++} value={"Sta10"}>
            Research misconduct
          </MenuItem>
        ];
    }
  };

  render() {
    const { values, handleChange, invalid, type } = this.props;
    console.log("details")
    console.log(values)
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Complaint details
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              autoFocus={values.title.value === ""}
              id="title"
              name="title"
              label="Title"
              fullWidth
              //placeholder=""
              //helperText="Please enter the title of your complaint."
              error={values.title.err}
              helperText={values.title.helpText}
              defaultValue={values.title.value}
              onChange={e => {
                if (!invalid(e.target.value, "title"))
                  handleChange("title", e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              id="category"
              name="category"
              label="Category"
              fullWidth
              //helperText="Please select an appropriate category."
              helperText={values.category.helpText}
              error={values.category.err}
              select
              value={values.category.value}
              onChange={e => {
                invalid(e.target.value, "category");
                handleChange("category", e);
              }}
            >
              {/* {this.category(this.props.type)} */}
              {this.category(values.type)}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="outlined"
              id="content"
              name="content"
              label="Details"
              //error={values.content.error}
              fullWidth
              multiline
              rows="3"
              defaultValue={values.content.value}
              error={values.content.err}
              helperText={values.content.helpText}
              //placeholder=""
              //helperText="Please detail the nature of your complaint setting out the context in which it arose and including details of incidents or events if appropriate."
              onChange={e => {
                if (!invalid(e.target.value, "content"))
                  handleChange("content", e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="suggestion"
              name="suggestion"
              label="Suggestions"
              fullWidth
              multiline
              rows="3"
              defaultValue={values.suggestion.value}
              helperText="Feel free to provide any suggestions."
              onChange={e => {
                handleChange("suggestion", e);
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>

      // <FormTheme>
      //   <React.Fragment>
      //     <div className="form">
      //       <div className="form-head">
      //         <h1>
      //           {this.props.type === "anonymous" ? "Anonymous" : "Step 2"}
      //         </h1>
      //         <h2>Complaint Details</h2>
      //       </div>
      //       <TextField
      //         error={values.title.err}
      //         helperText={values.title.helpText}
      //         placeholder="Please enter the title of your complaint"
      //         label="Title"
      //         onChange={e => {
      //           if (!this.invalid(e.target.value, "title"))
      //             handleChange("title", e);
      //         }}
      //         defaultValue={values.title}
      //         style={styles.textfield}
      //       />
      //       <br />
      //       <TextField
      //         style={styles.textfield}
      //         error={values.category.err}
      //         helperText={values.category.helpText}
      //         label="Category"
      //         select
      //         value={values.category}
      //         name="category"
      //         //style={styles.textfield}
      //         onChange={e => {
      //           this.invalid(e.target.value, "category");
      //           handleChange("category", e);
      //         }}
      //       >
      //         {/* Student */}
      //         {this.category(this.props.type)}
      //         {/* Others */}
      //         {/* <MenuItem value={"Academic Misconduct"}>Academic Misconduct</MenuItem>
      //         <MenuItem value={"Academic Status/Appeals"}>Academic Status/Appeals</MenuItem>
      //         <MenuItem value={"Admissions"}>FrAdmissionsaud</MenuItem>
      //         <MenuItem value={"Breach of Privacy"}>Breach of Privacy</MenuItem>
      //         <MenuItem value={"Compliance Breach"}>Compliance Breach</MenuItem>
      //         <MenuItem value={"Computer Software / System Concerns"}>Computer Software / System Concerns</MenuItem>
      //         <MenuItem value={"Conflict of Interest - Failure to Declare"}>Conflict of Interest - Failure to Declare</MenuItem>
      //         <MenuItem value={"Customer Service"}>Customer Service</MenuItem>
      //         <MenuItem value={"Disability Access and Inclusion"}>Disability Access and Inclusion</MenuItem>
      //         <MenuItem value={"Discrimination"}>Discrimination</MenuItem>
      //         <MenuItem value={"Employment"}>Employment</MenuItem>
      //         <MenuItem value={"Enrolment"}>Enrolment</MenuItem>
      //         <MenuItem value={"Feedback"}>Feedback</MenuItem>
      //         <MenuItem value={"Fees and Charges"}>Fees and Charges</MenuItem>
      //         <MenuItem value={"General Misconduct"}>General Misconduct</MenuItem>
      //         <MenuItem value={"Occupational Health and Safety concerns"}>Occupational Health and Safety concerns</MenuItem>
      //         <MenuItem value={"Parking"}>Parking</MenuItem>
      //         <MenuItem value={"Policy, Process and Procedures of the University"}>Policy, Process and Procedures of the University</MenuItem>
      //         <MenuItem value={"Recruitment Process"}>Recruitment Process</MenuItem>
      //         <MenuItem value={"Security"}>Security</MenuItem>
      //         <MenuItem value={"Serious Misconduct"}>Serious Misconduct</MenuItem>
      //         <MenuItem value={"Student Guild"}>Student Guild</MenuItem>
      //         <MenuItem value={"Student Services"}>Student Services</MenuItem>
      //         <MenuItem value={"Teaching"}>Teaching</MenuItem> */}
      //       </TextField>
      //       <br />
      //       <TextField
      //         placeholder="Please detail below the nature of your complaint setting out the context in which it arose and including details of incidents or events if appropriate."
      //         label="Details"
      //         multiline
      //         rows="3"
      //         variant="outlined"
      //         error={values.content.err}
      //         helperText={values.content.helpText}
      //         onChange={e => {
      //           if (!this.invalid(e.target.value, "content"))
      //             handleChange("content", e);
      //         }}
      //         defaultValue={values.content}
      //         style={styles.textfield}
      //       />
      //       <br />
      //       <TextField
      //         placeholder="Feel free to provide any suggestions."
      //         label="Suggestion"
      //         multiline
      //         rows="3"
      //         variant="outlined"
      //         onChange={e => {
      //           handleChange("suggestion", e);
      //         }}
      //         defaultValue={values.suggestion}
      //         style={styles.textfield}
      //       />
      //       <br />
      //       {this.props.type !== "anonymous" ? (
      //         <Button
      //           variant="contained"
      //           color="primary"
      //           style={styles.button}
      //           onClick={this.back}
      //         >
      //           Back
      //         </Button>
      //       ) : (
      //           ""
      //         )}
      //       <Button
      //         variant="contained"
      //         color="primary"
      //         style={styles.button}
      //         onClick={this.continue}
      //       >
      //         Continue
      //       </Button>

      //       <p style={{ color: "red" }}>{values.errMess}</p>
      //     </div>
      //   </React.Fragment>
      // </FormTheme>
    );
  }
}

export default FormComplaintDetails;
