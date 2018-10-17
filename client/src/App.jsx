import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";

import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import MainSnackbar from "./components/Snackbar/MainSnackbar";
import Landing from "./components/Landing/Landing";
import User from "./components/User/User";
import UserNotFound404 from "./components/404/UserNotFound404";
import API_URL from "./API_URL";

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      validatePassword: "",
      isLoggedIn: false,
      snackbarOpenSignIn: false,
      snackbarPasswordMismatch: false,
      snackbarOpenSignUp: false,
      snackbarOpenSignUpError: false,
      snackbarUserDoesNotExist: false,
      snackbarLogOut: false,
      snackbarVertical: "top",
      snackbarHorizontal: "center",
      snackbarAuthRedirect: false,
      tabState: 0,
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSignIn = e => {
    const { history } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post(`${API_URL}/login`, { email, password })
      .then(res => {
        this.setState({
          snackbarOpenSignIn: true,
          open: false,
          isLoggedIn: true
        });
        localStorage.setItem("token", res.data.token);
        history.push(`/${email}`);
      })
      .catch(error => {
        if (error.response.status === 423) {
          console.log("User does not exist");
          this.setState({ snackbarUserDoesNotExist: true });
        } else if (error.response.status === 422) {
          console.log("Password does not match");
          this.setState({ snackbarPasswordMismatch: true });
        }
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    axios
      .post(`${API_URL}/signup`, { firstName, lastName, email, password })
      .then(res => {
        this.setState({ snackbarOpenSignUp: true, tabState: 1 });
        console.log(res.data);
      })
      .catch(error => {
        this.setState({ snackbarOpenSignUpError: true });
        console.log(error, "User Already Exists");
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogOut = () => {
    const { history } = this.props;
    this.setState({
      isLoggedIn: false,
      tabState: 0,
      snackbarLogOut: true
    });
    localStorage.removeItem("token");
    history.push("/");
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbarOpenSignIn: false,
      snackbarPasswordMismatch: false,
      snackbarOpenSignUp: false,
      snackbarOpenSignUpError: false,
      snackbarLogOut: false,
      snackbarUserDoesNotExist: false,
      snackbarAuthRedirect: false
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  unauthorizedRedirect = () => {
    this.setState({
      tabState: 1,
      open: true,
      snackbarAuthRedirect: true
    });
  };

  render() {
    const {
      tabState,
      firstName,
      lastName,
      email,
      password,
      validatePassword,
      isLoggedIn,
      open,
      ...snackbarState
    } = this.state;
    return (
      // test key need to put into config when using production key
      <StripeProvider apiKey="pk_test_UIFQFAQQTuGQzdsoR1LhXtCz">
        <div>
          <React.Fragment>
            <MainSnackbar
              {...snackbarState}
              handleSnackbarClose={this.handleSnackbarClose}
            />
            <CssBaseline>
              <React.Fragment>
                <Route
                  path="/"
                  render={props => (
                    <Landing
                      {...props}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      isLoggedIn={isLoggedIn}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                  exact
                />
                <Route
                  path="/:user"
                  render={props => (
                    <User
                      {...props}
                      isLoggedIn={isLoggedIn}
                      unauthorizedRedirect={this.unauthorizedRedirect}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                />
                {/* If user logs in redirect User otherwise display landing page */}

                <Route
                  path="/:user/user-not-found"
                  render={props => (
                    <UserNotFound404
                      {...props}
                      isLoggedIn={isLoggedIn}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      password={password}
                      validatePassword={validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={open}
                    />
                  )}
                />
              </React.Fragment>
            </CssBaseline>
          </React.Fragment>
        </div>
      </StripeProvider>
    );
  }
}

export default withRouter(App);
