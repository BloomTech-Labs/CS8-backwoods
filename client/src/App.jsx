import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline>
          <h1>Back Woods App</h1>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
