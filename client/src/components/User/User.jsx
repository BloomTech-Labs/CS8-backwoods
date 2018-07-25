import React from 'react';
import Nav from '../Nav/Nav';
import MainTriplist from '../TripList/MainTripList';
import BillingForm from '../Billing/BillingForm';
import AccountForm from '../Account/AccountForm';
import { Route } from 'react-router-dom';

const User = (props) => {
  return (
    <div>
      <Nav user={props.email} isLoggedIn={props.isLoggedIn}/>
      <Route path="/:user" component={MainTriplist} exact/>
      <Route path="/:user/billing" component={BillingForm} exact/>
      <Route exact path="/:user/settings" component={AccountForm} />
    </div>
  )
}

export default User;