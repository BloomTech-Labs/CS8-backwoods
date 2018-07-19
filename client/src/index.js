import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App as Landing from './components/Landing/App.jsx';
import AccountForm from './components/Account/AccountForm.jsx';
import BillingForm from './components/Billing/BillingForm.jsx';
import DebugRoutes from './components/Debug/DebugRoutes.jsx';
import Nav from './components/Nav/Nav.jsx';
import Trip from './components/Trip/Trip.jsx';
import TripCreate from './components/Trip/TripCreate.jsx';
import TripList from './components/TripList/TripList.jsx';


import registerServiceWorker from './registerServiceWorker';
import './index.css';

// hot module replacement
if (module.hot) {
  module.hot.accept();
}
////////////////////////

ReactDOM.render(
  <div>
  <Router>
    <Route path="/*" component={DebugRoutes} />

    <Route exact path="/" component={Landing} />

    <Route path="/trips/*" component={Nav} />
    <Route exact path="/trips" component={TripList} />
    <Route exact path="/trips/:id" component={Trip} />
    <Route exact path="/trips/create" component={TripCreate} />
    <Route exact path="/account/settings" component={AccountForm} />
    <Route exact path="/account/billing" component={BillingForm} />
  </Router>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
