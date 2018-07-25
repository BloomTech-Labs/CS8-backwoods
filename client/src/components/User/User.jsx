import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
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
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8000/${this.props.match.params.user}`).then(res => {
      console.log(res);
      this.setState({ email: res.data.email, firstName: res.data.firstName, lastName: res.data.lastName })
    }).catch(err => {
      this.setState({ noUser: true })
      console.log(err);
    })
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        {
          this.state.noUser ?
            <Redirect to='/404' />
            :
            <div>
              <Nav user={this.props.email} isLoggedIn={this.props.isLoggedIn} />
              {this.state.firstName} {this.state.lastName}
              <Route path="/:user" component={MainTriplist} exact />
              <Route path="/:user/billing" component={BillingForm} exact />
              <Route exact path="/:user/settings" component={AccountForm} />
            </div>
        }
      </div>
    )
  }
}

export default User;