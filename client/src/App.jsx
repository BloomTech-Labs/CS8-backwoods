import API_URL from './API_URL';
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import MainSnackbar from './components/Snackbar/MainSnackbar';
import { Route, Redirect } from 'react-router-dom';
import SignInOut from './components/SignInOut/SignInOut.jsx';
import Landing from './components/Landing/Landing.jsx';
// import DebugRoutes from './components/Debug/DebugRoutes.jsx';
import { StripeProvider } from 'react-stripe-elements';
import User from './components/User/User';
import BackWoods404 from './components/404/404';

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validatePassword: '',
      isLoggedIn: false,
      snackbarOpenSignIn: false,
      snackbarOpenError: false,
      snackbarOpenSignUp: false,
      snackbarOpenSignUpError: false,
      snackbarLogOut: false,
      snackbarVertical: 'top',
      snackbarHorizontal: 'center',
      tabState: 0,
      open: false,
      fireRedirect: false
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
    axios.post(`${API_URL}/login`, { email, password })
      .then(res => {
        this.setState(
          { snackbarOpenSignIn: true, open: false, fireRedirect: true },
          this.handleLogInOut()
        );
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
      })
      .catch(error => {
        this.setState({ snackbarOpenError: true });
        console.log('INCORRECT USERNAME/PASSWORD');
      });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    axios.post(`${API_URL}/signup`, { firstName, lastName, email, password })
      .then(res => {
        this.setState({ snackbarOpenSignUp: true, tabState: 1 });
        console.log(res.data);
      })
      .catch(error => {
        this.setState({ snackbarOpenSignUpError: true });
        console.log('User Already Exists');
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogInOut = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      tabState: 0,
      snackbarLogOut: true,
      fireRedirect: !this.state.fireRedirect
    });
    localStorage.removeItem('token');
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpenSignIn: false });
    this.setState({ snackbarOpenError: false });
    this.setState({ snackbarOpenSignUp: false });
    this.setState({ snackbarOpenSignUpError: false });
    this.setState({ snackbarLogOut: false });
  };
  handleTabChange = (event, value) => {
    this.setState({ tabState: value });
  };

  render() {
    const { fireRedirect } = this.state;
    return (
      // test key need to put into config when using production key
      <StripeProvider apiKey="pk_test_UIFQFAQQTuGQzdsoR1LhXtCz">
        <div>
          <React.Fragment>
            <MainSnackbar
              snackbarOpenSignIn={this.state.snackbarOpenSignIn}
              snackbarOpenError={this.state.snackbarOpenError}
              snackbarOpenSignUp={this.state.snackbarOpenSignUp}
              snackbarOpenSignUpError={this.state.snackbarOpenSignUpError}
              snackbarLogOut={this.state.snackbarLogOut}
              handleSnackbarClose={this.handleSnackbarClose}
              snackbarVertical={this.state.snackbarVertical}
              snackbarHorizontal={this.state.snackbarHorizontal}
            />
            <CssBaseline>
              <SignInOut
                handleTabChange={this.handleTabChange}
                handleLogInOut={this.handleLogInOut}
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
              <React.Fragment>
                <Route
                  path="/:user"
                  render={props => (
                    <User
                      {...props}
                      isLoggedIn={this.state.isLoggedIn}
                      email={this.state.email}
                    />
                  )}
                />
                {/* If user logs in redirect User otherwise display landing page */}
                <Route
                  exact
                  path="/"
                  render={() =>
                    fireRedirect ? (
                      <Redirect to={`/${this.state.email}`} />
                    ) : (
                        <Landing />
                      )
                  }
                />
                <Route path="/404" component={BackWoods404} />
              </React.Fragment>
            </CssBaseline>
          </React.Fragment>
          {/* <DebugRoutes /> */}
        </div>
      </StripeProvider>
    );
  }
}

export default App;
