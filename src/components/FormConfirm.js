import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
// import FormTheme from "./FormTheme";
import TextField from "@material-ui/core/TextField";
// import styles from "./FormStyles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

import categoryMap from "./Category";

// Input Adornments and Icons
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Email from "@material-ui/icons/Email";
import Subject from "@material-ui/icons/Subject";
import Category from "@material-ui/icons/Category";
import Create from "@material-ui/icons/Create";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  },
  textField: {
    margin: "dense",
    variant: "outlined"
    // InputProps: {
    //   readOnly: true,
    // }
  }
}));

const Review = props => {
  // console.log("Review");
  // console.log(props);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {props.props.type !== "anonymous" && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Contact
          </Typography>
          </Grid>)}
        {props.props.type !== "anonymous" && (
          <Grid item xs={12}>
            <TextField
              label="Full name"
              value={
                props.props.firstName.value + " " + props.props.lastName.value
              }
              className={classes.textField}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Grid>
        )}
        {props.props.type !== "anonymous" && (
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={props.props.email.value}
              className={classes.textField}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Summary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={props.props.title.value}
            className={classes.textField}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Subject />
                </InputAdornment>
              )
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category"
            value={categoryMap.get(props.props.category.value)}
            className={classes.textField}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Category />
                </InputAdornment>
              )
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Details"
            value={props.props.content.value}
            className={classes.textField}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Create />
                </InputAdornment>
              )
            }}
            fullWidth
            multiline
            rows="3"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Suggestion"
            value={props.props.suggestion.value}
            className={classes.textField}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <QuestionAnswer />
                </InputAdornment>
              )
            }}
            fullWidth
            multiline
            rows={props.props.suggestion !== "" ? "3" : "1"}
          />
        </Grid>
      </Grid>
      {/* <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
};

export class FormConfirm extends Component {
  // handle confirm button
  continue = e => {
    const { values } = this.props;
    e.preventDefault();

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
          this.props.nextStep();
        } else {
          console.log("Fetch failed");
        }
      })
      .catch(err => {
        console.log("error", err);
        this.props.history.push({
          pathname: "/error",
          state: {
            connect: false
          }
        });
      });
  };

  // handle back button
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    //const { } = this.props;
    const {
      values: {
        firstName,
        lastName,
        email,
        title,
        category,
        content,
        suggestion,
        type
      }
    } = this.props;
    const values = {
      firstName,
      lastName,
      email,
      title,
      category,
      content,
      suggestion,
      type
    };

    return (
      <div>
        <Review props={values} />
      </div>
    );

    //   <FormTheme>
    //     <React.Fragment>
    //       <div className="form">
    //         <div className="form-head">
    //           <h1>
    //             {this.props.type === "anonymous" ? "Anonymous" : "Step 3"}
    //           </h1>
    //           <h2>Confirmation </h2>
    //         </div>
    //         {this.props.type === "anonymous" ? (
    //           ""
    //         ) : (
    //             <>
    //               <TextField
    //                 disabled
    //                 style={styles.textfield}
    //                 label="First Name"
    //                 defaultValue={firstName}
    //               />
    //               <br />
    //             </>
    //           )}
    //         {this.props.type === "anonymous" ? (
    //           ""
    //         ) : (
    //             <>
    //               <TextField
    //                 disabled
    //                 style={styles.textfield}
    //                 label="Last Name"
    //                 defaultValue={lastName}
    //               />
    //               <br />
    //             </>
    //           )}
    //         {this.props.type === "anonymous" ? (
    //           ""
    //         ) : (
    //             <>
    //               <TextField
    //                 disabled
    //                 style={styles.textfield}
    //                 label="Email"
    //                 defaultValue={email}
    //               />
    //               <br />
    //             </>
    //           )}
    //         <TextField
    //           disabled
    //           style={styles.textfield}
    //           label="Title"
    //           defaultValue={title}
    //         />
    //         <br />
    //         <TextField
    //           disabled
    //           style={styles.textfield}
    //           label="Category"
    //           defaultValue={category}
    //         />
    //         <br />
    //         <br />
    //         <TextField
    //           disabled
    //           style={styles.textfield}
    //           label="Content"
    //           multiline
    //           rows="3"
    //           variant="outlined"
    //           defaultValue={content}
    //         />
    //         <br />
    //         <br />
    //         <TextField
    //           disabled
    //           style={styles.textfield}
    //           label="Suggestion"
    //           variant="outlined"
    //           multiline
    //           rows="3"
    //           defaultValue={suggestion}
    //         />
    //         <br />
    //         <br />
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           style={styles.button}
    //           onClick={this.back}
    //         >
    //           Back
    //         </Button>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           style={styles.button}
    //           onClick={this.continue}
    //         >
    //           Confirm
    //         </Button>
    //       </div>
    //     </React.Fragment>
    //   </FormTheme>
    // );
  }
}

export default FormConfirm;
