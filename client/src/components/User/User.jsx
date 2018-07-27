import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
import TripCreate from '../TripCreate/TripCreate';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

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
    }
  }

  componentWillMount() {
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

  // addNewTrip = () => {
  //   // const hardCodeNewTrip = {
  //   //     tripName: "Next Trip",
  //   //     startDate: "bla bla",
  //   //     endDate: "more bla",
  //   //     email: 'bla'
  //   //   }
  //   // this.setState({ 
  //   //   trips: [...this.state.trips, hardCodeNewTrip]
  //   // })
  // }

  render() {
    return (
      <div>
        {
          this.state.noUser ?
            <Redirect to='/404' />
            :
            <div>
              <Nav user={this.props.email} isLoggedIn={this.props.isLoggedIn} />
              <Route path="/:user"
                render={(props) => <MainTriplist {...props}
                  trips={this.state.trips}
                  user={this.props.email}
                // addNewTrip={this.addNewTrip}
                />} exact />
              <Route path="/:user/create" render={props => (<TripCreate {...props} email={this.props.email} user={this.props.email} getUsersAgain={this.getUsersAgain} />)} />
              <Route path="/:user/billing" component={BillingForm} />
              <Route path="/:user/settings" component={AccountForm} />
            </div>
        }
      </div>
    )
  }
}

export default User;
