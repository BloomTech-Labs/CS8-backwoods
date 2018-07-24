import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
// removed Redirect to get rid of react error
import { Route, Redirect } from 'react-router-dom'
import Modal from './components/Sign-in-out-nav/Modal.jsx';
import PageContent from './components/Landing/PageContent.jsx';
import AccountForm from './components/Account/AccountForm.jsx';
import BillingForm from './components/Billing/BillingForm.jsx';
import DebugRoutes from './components/Debug/DebugRoutes.jsx';
// import Nav from './components/Nav/Nav.jsx';
import Trip from './components/Trip/Trip.jsx';
import TripCreate from './components/Trip/TripCreate.jsx';
import TripList from './components/TripList/TripList.jsx';
import TripListEmpty from './components/TripList/TripListEmpty.jsx';
import MySnackbarContent from './Snackbar'

import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';

import { withStyles } from '@material-ui/core/styles';
// import { Switch } from '../node_modules/@material-ui/core';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
      fireRedirect: false,
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
    axios.post('https://ancient-inlet-94126.herokuapp.com/login', { email, password })
    // DEV axios post
    // axios.post('http://localhost:8000/login', { email, password })
      .then(res => {
        this.setState({ snackbarOpenSignIn: true, open: false, fireRedirect: true }, this.handleLogInOut())
        localStorage.setItem('token', res.data.token);
        console.log(res.data)
      }).catch(error => {
        this.setState({ snackbarOpenError: true })
        console.log("INCORRECT USERNAME/PASSWORD")
      })
  }

  handleSignUp = e => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    axios.post('https://ancient-inlet-94126.herokuapp.com/signup', { firstName, lastName, email, password })

    //DEV axios post
    // axios.post('http://localhost:8000/signup', { firstName, lastName, email, password })
      .then(res => {
        this.setState({ snackbarOpenSignUp: true, tabState: 1 })
        console.log(res.data)
      }).catch(error => {
        this.setState({ snackbarOpenSignUpError: true })
        console.log("User Already Exists")
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleLogInOut = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn, tabState: 0, snackbarLogOut: true, fireRedirect: false });
    localStorage.removeItem('token');
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpenSignIn: false });
    this.setState({ snackbarOpenError: false });
    this.setState({ snackbarOpenSignUp: false });
    this.setState({ snackbarOpenSignUpError: false })
    this.setState({ snackbarLogOut: false })
  };
  handleTabChange = (event, value) => {
    this.setState({ tabState: value })
  }

  render() {
    const { fireRedirect } = this.state
    return (
      <div>
        <React.Fragment>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarLogOut}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Logged out successfully!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarOpenError}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="error"
              message="Incorrect Username/Password"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarOpenSignIn}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Logged in successful!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarOpenSignUp}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="User successfully created!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarOpenSignUpError}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="error"
              message="User already exists!"
            />
          </Snackbar>
          <CssBaseline>
            <Modal
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
            {fireRedirect && (
              <Redirect to={"/trips"} />
            )}
            <React.Fragment>
              <Route path="/*" component={DebugRoutes} />
              <Route exact path="/" component={PageContent} /> {/* Landing */}
              {/* <Route path="/trips/*" component={Nav} /> */}
              <Route exact path="/trips" component={TripList} />
              <Route exact path="/trips/id/:id/" component={Trip} />
              <Route exact path="/trips/create/" component={TripCreate} />
              <Route exact path="/trips/empty/" component={TripListEmpty} />
              <Route exact path="/trips/settings/" component={AccountForm} />
              <Route exact path="/trips/billing/" component={BillingForm} />
            </React.Fragment>
          </CssBaseline>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
