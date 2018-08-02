import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
import TripCreate from '../TripCreate/TripCreate';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import GetArchived from '../Archived/GetArchived';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import TripOpen from '../TripOpen/TripOpen';
import { Switch } from 'react-router-dom'
import MySnackbarContent from '../Snackbar/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

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
      email: '',
      trips: [],
      tripName: '',
      startDate: '',
      endDate: '',
      hasTrips: false,
      snackbarArchive: false,
      snackbarError: false,
      snackbarVertical: 'top',
      snackbarHorizontal: 'center',
    }
    this.archiveTrip = this.archiveTrip.bind(this);
  }

  componentWillMount() {
    // DEPLOY URL FOR AXIOS CALL
    // axios.get(`https://ancient-inlet-94126.herokuapp.com/${this.props.match.params.user}`).then(res => {

    // TEST URL FOR AXIOS CALL
    axios.get(`http://localhost:8000/${this.props.match.params.user}`).then(res => {
      if (!res.data) {
        this.setState({ hasTrips: false });
        return
      }
      this.setState({ hasTrips: true, trips: res.data.trips })
    }).catch(err => {
      if (!this.props.isLoggedIn) {
        this.setState({ noUser: true })
      }
      console.log(err);
    })
  }

  getUsersAgain = () => {
    // DEPLOY URL FOR AXIOS CALL
    // axios.get(`https://ancient-inlet-94126.herokuapp.com/${this.props.match.params.user}`).then(res => {

    // TEST URL FOR AXIOS CALL
    axios.get(`http://localhost:8000/${this.props.match.params.user}`).then(res => {
      if (!res.data) {
        this.setState({ hasTrips: false });
        return
      }
      this.setState({ hasTrips: true, trips: res.data.trips })
    }).catch(err => {
      if (!this.props.isLoggedIn) {
        this.setState({ noUser: true })
      }
      console.log(err);
    })
  }

  archiveTrip(TripId, index) {
    const trips = [...this.state.trips]
    const token = localStorage.getItem('token');
    const id = TripId;
    axios.put(`http://localhost:8000/${this.props.match.params.user}/archiveTrip`, { id: id, archived: true }, { headers: { authorization: token } })
      .then(res => {
        const newTrips = trips.splice(index, 1)
        this.setState({ trips: trips, snackbarArchive: true })
        console.log(res)

      }).catch(err => {
        console.log(err)
        this.setState({ snackbarError: true })
      })
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarArchive: false });
    this.setState({ snackbarError: false });
  };

  render() {
    return (
      <div>
        {
          this.state.noUser ?
            <Redirect to='/404' />
            :
            <div className="mainWrapper">
              <Nav user={this.props.email} isLoggedIn={this.props.isLoggedIn} />
              <Switch>
                <Route path="/:user"
                  render={(props) => <MainTriplist {...props}
                    trips={this.state.trips}
                    user={this.props.email}
                    archiveTrip={this.archiveTrip}
                    isLoggedIn={this.props.isLoggedIn}
                  />} exact />
                <Route path="/:user/create" render={props => (<TripCreate {...props} email={this.props.email} user={this.props.email} getUsersAgain={this.getUsersAgain} />)} exact />
                <Route path="/:user/archived" render={props => (<GetArchived {...props} getUsersAgain={this.getUsersAgain} />)} exact />
                <Route path="/:user/billing" component={BillingForm} exact />
                <Route path="/:user/settings" component={AccountForm} exact />
                <Route path="/:user/:slug" component={TripOpen} exact />
              </Switch>
            </div>
        }
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
          onClose={this.state.snackbarHorizontal}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message="Server Cannot Archive Trip!"
          />
        </Snackbar>
      </div>
    )
  }
}

export default User;
