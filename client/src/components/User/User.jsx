import API_URL from '../../API_URL';
import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
import TripCreate from '../TripCreate/TripCreate';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import GetArchived from '../Archived/GetArchived';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import TripOpen from '../TripOpen/TripOpen';
import MySnackbarContent from '../Snackbar/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import BadUrl404 from '../404/BadUrl404';
import {testTrip} from '../TripOpen/testData';

const RestrictedRoute = ({
  component: Component,
  isLoggedIn,
  unauthorizedRedirect,
  ...rest
}) => {
  return isLoggedIn ? (
    <Route {...rest} render={props => <Component {...props} {...rest} />} />
  ) : (
    <div>
      {unauthorizedRedirect()}
      <Redirect to="/" />
    </div>
  );
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noUser: false,
      error: false,
      emailFromUser: this.props.match.params.user,
      trips: [],
      tripName: '',
      startDate: '',
      endDate: '',
      hasTrips: false,
      snackbarArchive: false,
      snackbarError: false,
      snackbarVertical: 'top',
      snackbarHorizontal: 'center',
      tripSavedModal: false,
      isTripSaved: true,
      navRedirect: '',
      mobileOpen: false,
    };
    this.archiveTrip = this.archiveTrip.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.user === 'aaron@backwood.app') {
      console.log('Test User')
      this.setState({
        hasTrips: true,
        trips: testTrip,
        noUser: false
      })
      return
    } else {
      axios
      .get(`${API_URL}/${this.props.match.params.user}`)
      .then(res => {
        this.setState({ hasTrips: true, trips: res.data.trips });
      })
      .catch(error => {
        if (error.response.status === 423) {
          this.setState({ noUser: true });
        } else if (error.response.status === 422) {
          this.setState({ hasTrips: false });
        }

        console.log(error);
      });
    }
  }

  getUsersAgain = () => {
    axios
      .get(`${API_URL}/${this.props.match.params.user}`)
      .then(res => {
        if (!res.data) {
          this.setState({ hasTrips: false });
          return;
        }
        this.setState({ hasTrips: true, trips: res.data.trips });
      })
      .catch(err => {
        if (!this.props.isLoggedIn) {
          this.setState({ noUser: true });
        }
        console.log(err);
      });
  };

  setSaveTripTrue = () => {
    this.setState({ isTripSaved: true });
  };

  setSaveTripFalse = () => {
    this.setState({ isTripSaved: false });
  };

  modalContinue = () => {
    this.setState({ tripSavedModal: false, isTripSaved: true, mobileOpen: false });
  };

  checkIfTripSaved = (e, navLink) => {
    console.log('poop')
    this.setState({ navRedirect: navLink });
    if (!this.state.isTripSaved) {
      e.preventDefault();
      this.tripModalTrue();
    } else {
      this._checkIfMobileOpen()
      return;
    }
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  _checkIfMobileOpen = () => {
    if(!this.state.mobileOpen) {
      return
    }
    this.setState({ mobileOpen: false})
  }

  tripModalTrue = () => {
    this.setState({ tripSavedModal: true });
  };

  tripModalFalse = () => {
    this.setState({ tripSavedModal: false, mobileOpen: false });
  };

  archiveTrip(TripId, index) {
    const trips = [...this.state.trips];
    const token = localStorage.getItem('token');
    const id = TripId;
    axios
      .put(
        `${API_URL}/${this.props.match.params.user}/archiveTrip`,
        { id: id, archived: true },
        { headers: { authorization: token } }
      )
      .then(res => {
        trips.splice(index, 1);
        this.setState({ trips: trips, snackbarArchive: true });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackbarError: true });
      });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarArchive: false });
    this.setState({ snackbarError: false });
  };

  render() {
    // Not working!!!!!!!!!!!!!!
    // if(this.state.hasTrips === false && this.props.isLoggedIn === false && this.state.noUser === false) {
    //   return <UserHasNoTrips404/>
    // }
    // if(this.state.noUser === false) {
    //   return <h1>No user</h1>
    // }
    return (
      <React.Fragment>
        {this.state.noUser ? (
          <Redirect push to={`/${this.props.match.params.user}/user-not-found`} />
        ) : (
              <Nav
                ////////////NAV////////////
                emailFromUser={this.state.emailFromUser}
                user={this.props.email}
                mobileOpen={this.state.mobileOpen}
                handleDrawerToggle={this.handleDrawerToggle}
                isLoggedIn={this.props.isLoggedIn}
                checkIfTripSaved={this.checkIfTripSaved}
                ////////////SIGN IN/OUT///////////
                handleTabChange={this.props.handleTabChange}
                handleLogOut={this.props.handleLogOut}
                tabState={this.props.tabState}
                handleChange={this.props.handleChange}
                handleSignUp={this.props.handleSignUp}
                handleSignIn={this.props.handleSignIn}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                email={this.props.email}
                password={this.props.password}
                validatePassword={this.props.validatePassword}
                handleClose={this.props.handleClose}
                handleOpen={this.props.handleOpen}
                open={this.props.open}
                ///////////////MODAL//////////////
                tripModalFalse={this.tripModalFalse}
                tripSavedModal={this.state.tripSavedModal}
                navRedirect={this.state.navRedirect}
                modalContinue={this.modalContinue}
              >
              <Switch>
                <Route
                  path="/:user"
                  render={props => (
                    <MainTriplist
                      {...props}
                      trips={this.state.trips}
                      user={this.props.email}
                      archiveTrip={this.archiveTrip}
                      isLoggedIn={this.props.isLoggedIn}
                      setSaveTripFalse={this.setSaveTripFalse}
                    />
                  )}
                  exact
                />
                <RestrictedRoute
                  path="/:user/create"
                  component={TripCreate}
                  unauthorizedRedirect={this.props.unauthorizedRedirect}
                  isLoggedIn={this.props.isLoggedIn}
                  setSaveTripTrue={this.setSaveTripTrue}
                  email={this.props.email}
                  user={this.props.email}
                  getUsersAgain={this.getUsersAgain}
                  tripsFromUser={this.state.trips}
                />
                <RestrictedRoute
                  path="/:user/archived"
                  component={GetArchived}
                  isLoggedIn={this.props.isLoggedIn}
                  unauthorizedRedirect={this.props.unauthorizedRedirect}
                  getUsersAgain={this.getUsersAgain}
                />
                <RestrictedRoute
                  path="/:user/billing"
                  component={BillingForm}
                  isLoggedIn={this.props.isLoggedIn}
                  unauthorizedRedirect={this.props.unauthorizedRedirect}
                />
                <RestrictedRoute
                  path="/:user/settings"
                  component={AccountForm}
                  isLoggedIn={this.props.isLoggedIn}
                  unauthorizedRedirect={this.props.unauthorizedRedirect}
                />
                <Route path="/:user/trip/:slug" component={TripOpen} exact />

                <Route component={BadUrl404} />
              </Switch>
          </Nav>
       
        )}
        <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarArchive}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="success"
            message="Trip Archived Successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarError}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message="Server Cannot Archive Trip!"
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default User;
