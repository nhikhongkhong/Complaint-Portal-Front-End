import React, { Component } from "react";
//import { Redirect } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormTheme from "../components/FormTheme";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Auth from "./Auth";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Background from "../images/Murdoch1.jpg";

const regMail =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

const Display = state => {
  console.log(state);
  const classes = useStyles();

  //poper
  const open = Boolean(state.state.anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleSubmit = () => {};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={Background} alt="Background" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={state.continue}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={state.state.err}
              helperText={state.state.helpText}
              onChange={e => {
                if (!state.invalid(e.target.value)) state.handleChange(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                )
              }}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send OTP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot email?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have access? Contact an administrator"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Popper
            id={id}
            open={open}
            anchorEl={state.state.anchorEl}
            placement={"top"}
          >
            <Paper>
              <DialogTitle>{"An OTP Code was sent to your email."}</DialogTitle>
              <DialogContent>
                <TextField
                  error={state.state.OTPerr}
                  helperText={state.state.OTPhelpText}
                  placeholder="Enter Code"
                  style={styles.textfield}
                  onChange={e => state.handleChangeOTP(e)}
                  inputProps={{ maxLength: 4 }}
                />
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={state.confirm}>
                  Send
                </Button>
              </DialogActions>
            </Paper>
          </Popper>
        </div>
      </Grid>
    </Grid>
  );
};

export class DashboardLogin extends Component {
  constructor(props) {
    super(props);
    this.invalid = this.invalid.bind();
    this.handleChange = this.handleChange.bind();
    this.continue = this.continue.bind();
    this.handleChangeOTP = this.handleChangeOTP.bind();
    this.confirm = this.confirm.bind();
  }

  state = {
    err: false,
    OTPerr: false,
    email: "",
    helpText: "",
    OTPhelpText: "",
    anchorEl: null,
    otp: null,
    login: false
  };

  // return the login status
  isLogin() {
    return this.state.login;
  }

  // input field validation
  invalid = name => {
    let errM = name === "" || !name.match(regMail);
    this.setState({
      err: errM,
      email: name,
      helpText: errM ? "Invalid Email" : ""
    });
    return errM;
  };

  // handle continue button
  continue = e => {
    e.preventDefault();
    if (!this.invalid(this.state.email)) {
      const anchor = e.currentTarget;
      const stateAnchor = this.state.anchorEl;
      console.log("Continue...");

      const values = { email: this.state.email };

      fetch("/api/dashboard-login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }).then(res =>
        res.json().then(data => {
          if (data) {
            console.log(anchor);
            this.setState({
              anchorEl: stateAnchor ? null : anchor
            });
          } else
            toast.error("Sorry. You do not have access to the dashboard", {
              position: toast.POSITION.BOTTOM_CENTER
            });
        })
      );
    }
  };

  // handle change
  handleChange = e => {
    this.setState({ email: e.target.value });
  };

  // handle OTP input
  handleChangeOTP = e => {
    this.setState({ otp: e.target.value });
  };

  confirm = e => {
    // this.setState({ anchorEl: this.state.anchorEl ? null : e.currentTarget });
    const values = {
      email: this.state.email,
      otp: this.state.otp,
      err: this.state.err
    };
    fetch("/api/dashboard-login/confirm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          login: Boolean(data.flag),
          err: data.err
        });
        if (this.state.login) {
          Auth.login(() => {
            this.props.history.push({
              pathname: "/dashboard",
              state: {
                email: this.state.email,
                role: data.role,
                name: data.name
              }
            });
          });
        } else {
          this.setState({
            OTPerr: true,
            OTPhelpText: "Incorrect Verification Code"
          });
        }
      });
  };

  render() {
    //poper
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popper" : undefined;
    return (
      <>
        <Navbar />
        <div>
          <Display
            state={this.state}
            invalid={this.invalid}
            handleChange={this.handleChange}
            continue={this.continue}
            handleChangeOTP={this.handleChangeOTP}
            confirm={this.confirm}
          />
        </div>
      </>
    );
    //   <Hero hero="loginHero">
    //     <FormTheme>
    //       <React.Fragment>
    //         <div className="form">
    //           <div className="form-head">
    //             <h1>Log In</h1> <h4>OTP Verification</h4>
    //           </div>

    //           <TextField
    //             error={this.state.err}
    //             placeholder="Enter your Email"
    //             label="Email Address"
    //             type="email"
    //             helperText={this.state.helpText}
    //             onChange={e => {
    //               if (!this.invalid(e.target.value)) this.handleChange(e);
    //             }}
    //             style={styles.textfield}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="start">
    //                   <MailOutline />
    //                 </InputAdornment>
    //               )
    //             }}
    //           />
    //           <br />
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             style={styles.button}
    //             aria-describedby={id}
    //             onClick={this.continue}
    //           >
    //             Get OTP
    //             </Button>
    //           <Popper
    //             id={id}
    //             open={open}
    //             anchorEl={this.state.anchorEl}
    //             placement={"top"}
    //           >
    //             <Paper>
    //               <DialogTitle>
    //                 {"An OTP Code was sent to your email."}
    //               </DialogTitle>
    //               <DialogContent>
    //                 <TextField
    //                   error={this.state.OTPerr}
    //                   helperText={this.state.OTPhelpText}
    //                   placeholder="Enter Code"
    //                   style={styles.textfield}
    //                   onChange={e => this.handleChangeOTP(e)}
    //                 />
    //               </DialogContent>
    //               <DialogActions>
    //                 <Button color="primary" onClick={this.confirm}>
    //                   Send
    //                   </Button>
    //               </DialogActions>
    //             </Paper>
    //           </Popper>
    //         </div>
    //       </React.Fragment>
    //     </FormTheme>
    //   </Hero>
    //   </>
    // );
  }
}
const styles = {
  button: { margin: 30, color: "white" },
  textfield: { margin: 15 }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    //backgroundImage: "url(../images/Murdoch1.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default DashboardLogin;
