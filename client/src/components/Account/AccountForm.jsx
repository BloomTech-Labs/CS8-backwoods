import React from "react";
import axios from "axios";

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import Snackbar from "../Snackbar/Snackbar";
import "./Account.css";
import API_URL from "../../API_URL";

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      }
    }
  }
});
const styles = () => ({
  button: {
    margin: "auto",
    textAlign: "center"
  }
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // }
});

class AccountForm extends React.Component {
  state = {
    email: "",
    password: "",
    oldPassword: "",
    res: null,
    error: null,
    snackbarVariant: "",
    snackbarMessage: "",
    snackbarOpen: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { email, password } = this.state;
    axios
      .put(
        `${API_URL}/trips/settings`,
        { email, password },
        { headers: { authorization: token } }
      )
      .then(res => {
        this.setState(
          { res },
          this.handleSnackbarOpen("success", "Changed Password Successfully!")
        );
      })
      .catch(error => {
        this.setState(
          { error },
          this.handleSnackbarOpen(
            "error",
            "Must Be Logged In To Change Password!"
          )
        );
      });
  };

  handleSnackbarOpen = (variant, message) => {
    this.setState({
      snackbarVariant: variant,
      snackbarMessage: message,
      snackbarOpen: true
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { password, oldPassword, email, ...snackbarState } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          handleSnackbarClose={this.handleSnackbarClose}
          {...snackbarState}
        />
        <Fade in>
          <div className="accountWrapper">
            <Paper className="formPaper">
              <Typography variant="headline">Change Password</Typography>
              <form onSubmit={this.handleSubmit} className="accountForm">
                <div className="accountTextFieldWrapper">
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      required
                      id="required"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={this.handleChange("email")}
                      autoComplete="email"
                      margin="normal"
                    />
                    <TextField
                      required
                      label="Old Password"
                      value={oldPassword}
                      onChange={this.handleChange("oldPassword")}
                      type="password"
                      autoComplete="current-password"
                      margin="normal"
                    />
                    <TextField
                      required
                      label="New Password"
                      value={password}
                      onChange={this.handleChange("password")}
                      type="password"
                      margin="normal"
                    />
                  </MuiThemeProvider>
                </div>

                <div className="accountSubmitWrapper">
                  <MuiThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      type="submit"
                      color="primary"
                    >
                      Submit
                      <Icon className="accountSubmitIcon">send</Icon>
                    </Button>
                  </MuiThemeProvider>
                </div>
              </form>
            </Paper>
          </div>
        </Fade>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AccountForm);
