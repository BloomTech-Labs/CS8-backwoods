import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import BuyNow from './components/Landing/BuyNow.jsx';
import Modal from './components/Landing/Modal.jsx';

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(e) {
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <CssBaseline>
            <Modal />
            <h1>Back Woods App</h1>
            <BuyNow />
          </CssBaseline>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
