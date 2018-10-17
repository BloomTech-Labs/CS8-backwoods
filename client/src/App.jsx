import API_URL from "./API_URL";
import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import MainSnackbar from "./components/Snackbar/MainSnackbar";
import { Route, withRouter } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import { StripeProvider } from "react-stripe-elements";
import User from "./components/User/User";
import UserNotFound404 from "./components/404/UserNotFound404";

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
        this.props.history.push(`/${this.state.email}`);
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
        console.log("User Already Exists");
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
      tabState: 0,
      snackbarLogOut: true
    });
    localStorage.removeItem("token");
    this.props.history.push("/");
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
    return (
      // test key need to put into config when using production key
      <StripeProvider apiKey="pk_test_UIFQFAQQTuGQzdsoR1LhXtCz">
        <div>
          <React.Fragment>
            <MainSnackbar
              snackbarOpenSignIn={this.state.snackbarOpenSignIn}
              snackbarPasswordMismatch={this.state.snackbarPasswordMismatch}
              snackbarOpenSignUp={this.state.snackbarOpenSignUp}
              snackbarOpenSignUpError={this.state.snackbarOpenSignUpError}
              snackbarLogOut={this.state.snackbarLogOut}
              handleSnackbarClose={this.handleSnackbarClose}
              snackbarVertical={this.state.snackbarVertical}
              snackbarHorizontal={this.state.snackbarHorizontal}
              snackbarUserDoesNotExist={this.state.snackbarUserDoesNotExist}
              snackbarAuthRedirect={this.state.snackbarAuthRedirect}
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
                      tabState={this.state.tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      password={this.state.password}
                      validatePassword={this.state.validatePassword}
                      isLoggedIn={this.state.isLoggedIn}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={this.state.open}
                    />
                  )}
                  exact
                />
                <Route
                  path="/:user"
                  render={props => (
                    <User
                      {...props}
                      isLoggedIn={this.state.isLoggedIn}
                      unauthorizedRedirect={this.unauthorizedRedirect}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={this.state.tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      password={this.state.password}
                      validatePassword={this.state.validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={this.state.open}
                    />
                  )}
                />
                {/* If user logs in redirect User otherwise display landing page */}

                <Route
                  path="/:user/user-not-found"
                  render={props => (
                    <UserNotFound404
                      {...props}
                      isLoggedIn={this.state.isLoggedIn}
                      handleTabChange={this.handleTabChange}
                      handleLogOut={this.handleLogOut}
                      tabState={this.state.tabState}
                      handleChange={this.handleChange}
                      handleSignUp={this.handleSignUp}
                      handleSignIn={this.handleSignIn}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      password={this.state.password}
                      validatePassword={this.state.validatePassword}
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                      open={this.state.open}
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
