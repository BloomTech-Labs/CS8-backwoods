import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App.jsx';
import AccountForm from './components/Account/AccountForm.jsx';
import BillingForm from './components/Billing/BillingForm.jsx';
import DebugRoutes from './components/Debug/DebugRoutes.jsx';
import Nav from './components/Nav/Nav.jsx';
import Trip from './components/Trip/Trip.jsx';
import TripCreate from './components/Trip/TripCreate.jsx';
import TripList from './components/TripList/TripList.jsx';
import TripListEmpty from './components/TripList/TripListEmpty.jsx';

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
      <div>
        <Route path="/*" component={DebugRoutes} />
        <Route exact path="/" component={App} /> {/* Landing */}
        <Route path="/trips/*" component={Nav} />
        <Route exact path="/trips/" component={TripList} />
        <Route exact path="/trips/id/:id/" component={Trip} />
        <Route exact path="/trips/create/" component={TripCreate} />
        <Route exact path="/trips/empty/" component={TripListEmpty} />
        <Route exact path="/trips/settings/" component={AccountForm} />
        <Route exact path="/trips/billing/" component={BillingForm} />
      </div>
    </Router>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
