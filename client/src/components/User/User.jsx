import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
import TripCreate from '../TripCreate/TripCreate';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import Archived from '../Archived/Archived';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import TripOpen from '../TripOpen/TripOpen';
import { Switch } from 'react-router-dom'
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

  archiveTrip(TripId) {
    const token = localStorage.getItem('token');
    const id = TripId;
    console.log(id);
    axios.put(`http://localhost:8000/${this.props.match.params.user}/archiveTrip`, { id: id, Archived: true }, { headers: { authorization: token } })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

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
                  />} exact />

                <Route path="/:user/create" render={props => (<TripCreate {...props} email={this.props.email} user={this.props.email} getUsersAgain={this.getUsersAgain} />)} exact />
                <Route path="/:user/archived" component={Archived} exact />
                <Route path="/:user/billing" component={BillingForm} exact />
                <Route path="/:user/settings" component={AccountForm} exact />
                <Route path="/:user/:slug" component={TripOpen} exact />
              </Switch>
            </div>
        }
      </div>
    )
  }
}

export default User;
