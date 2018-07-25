import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import MainSnackbar from './components/Snackbar/MainSnackbar'
import { Route, Redirect } from 'react-router-dom';
import Modal from './components/Sign-in-out-nav/Modal.jsx';
import PageContent from './components/Landing/PageContent.jsx';
// import AccountForm from './components/Account/AccountForm.jsx';
// import BillingForm from './components/Billing/BillingForm.jsx';
import DebugRoutes from './components/Debug/DebugRoutes.jsx';
// import Nav from './components/Nav/Nav.jsx';
import Trip from './components/Trip/Trip.jsx';
import TripCreate from './components/Trip/TripCreate.jsx';
import TripList from './components/TripList/TripList.jsx';
import TripListEmpty from './components/TripList/TripListEmpty.jsx';
import { StripeProvider } from 'react-stripe-elements';
import User from './components/User/User';
import { Switch } from '../node_modules/@material-ui/core';

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
    // Deploy axios post
    // axios.post('https://ancient-inlet-94126.herokuapp.com/login', { email, password })
    // DEV axios post
    axios.post('http://localhost:8000/login', { email, password })

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
    // Deploy axios call
    // axios.post('https://ancient-inlet-94126.herokuapp.com/signup', { firstName, lastName, email, password })
    // local dev axios call
    axios
      .post('http://localhost:8000/signup', {
        firstName,
        lastName,
        email,
        password
      })

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
      fireRedirect: false
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
              {fireRedirect && <Redirect to={`/${this.state.email}`} />}

              <React.Fragment>
                {/* <Switch> */}
                {/* <Route path="/*" component={DebugRoutes} /> */}
                <Route exact path="/" component={PageContent} /> {/* Landing */}
                <Route path="/:user"
                  render={(props) => <User {...props} isLoggedIn={this.state.isLoggedIn} email={this.state.email}/>}/>
                {/* <Route path="/trips/*" component={Nav} /> */}
                <Route exact path="/trips" component={TripList} />
                <Route exact path="/trips/id/:id/" component={Trip} />
                <Route exact path="/trips/create/" component={TripCreate} />
                <Route exact path="/trips/empty/" component={TripListEmpty} />
                {/* <Route exact path="/trips/settings/" component={AccountForm} />
                <Route exact path="/trips/billing/" component={BillingForm} /> */}
                {/* </Switch> */}
              </React.Fragment>
            </CssBaseline>
          </React.Fragment>
          <DebugRoutes/>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
