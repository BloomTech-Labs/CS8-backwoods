import React from 'react';
import Nav from '../Nav/Nav';
import MainTripList from '../TripList/MainTripList';
import TripCreate from '../TripCreate/TripCreate';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

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
      hasTrips: false
    };
  }

  componentWillMount() {
    // DEPLOY URL FOR AXIOS CALL
    // axios.get(`https://ancient-inlet-94126.herokuapp.com/${this.props.match.params.user}`).then(res => {

    // TEST URL FOR AXIOS CALL
    axios
      .get(`http://localhost:8000/${this.props.match.params.user}`)
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
  }

  getUsersAgain = () => {
    // DEPLOY URL FOR AXIOS CALL
    // axios.get(`https://ancient-inlet-94126.herokuapp.com/${this.props.match.params.user}`).then(res => {

    // TEST URL FOR AXIOS CALL
    axios
      .get(`http://localhost:8000/${this.props.match.params.user}`)
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

  render() {
    return (
      <div>
        {this.state.noUser ? (
          <Redirect to="/404" />
        ) : (
          <div>
            <Nav user={this.props.email} isLoggedIn={this.props.isLoggedIn} />
            <Route
              path="/:user"
              render={props => (
                <MainTripList
                  {...props}
                  trips={this.state.trips}
                  user={this.props.email}
                />
              )}
              exact
            />
            <Route
              path="/:user/create"
              render={props => (
                <TripCreate
                  {...props}
                  email={this.props.email}
                  user={this.props.email}
                  getUsersAgain={this.getUsersAgain}
                />
              )}
            />
            <Route path="/:user/billing" component={BillingForm} />
            <Route path="/:user/settings" component={AccountForm} />
          </div>
        )}
      </div>
    );
  }
}

export default User;
