import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import BuyNow from './components/Landing/BuyNow.jsx';
import Modal from './components/Landing/Modal.jsx';
import PageContent from './components/Landing/PageContent.jsx';
import Snackbar from '@material-ui/core/Snackbar';

// CssBaseline is the Material UI built in CSS reset
class App extends Component {
  constructor() {
    super();
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        validatePassword: '',
        isLoggedIn: false,
        snackbarOpen: false,
        snackbarVertical: 'top',
        snackbarHorizontal: 'center'
    };
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleSignIn = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:8000/login', { email, password })
      .then(res => {
        this.setState({ snackbarOpen: true })
        console.log(res);
        console.log(res.data)
      }).catch(error => {
        this.setState({ snackbarOpen: true })
        console.log("INCORRECT USERNAME/PASSWORD")
      })
  }

  handleSignUp = e => {
    e.preventDefault();
    const { firstName, lastName, email, password} = this.state;
    axios.post('http://localhost:8000/signup', { firstName, lastName, email, password })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleLogIn(e) {
    this.setState({ isLoggedIn: true });
  }
  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSnackbarClick = state => () => {
    this.setState({ snackbarOpen: true, ...state });
  };

  render() {
    return (
      <div>
        <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
          open={this.state.snackbarOpen}
          onClose={this.handleSnackbarClose}
          ContentProps={{ 'aria-describedby': "message-id" }}
          autoHideDuration={6000}
          message={<span id="message-id">Incorrect Username/Password</span>}
        />
        <Snackbar
          anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
          open={this.state.snackbarOpen}
          onClose={this.handleSnackbarClose}
          autoHideDuration={6000}
          ContentProps={{ 'aria-describedby': "message-id1" }}
          message={<span id="message-id1">Logged in successful!</span>}
        />
          <CssBaseline>
            <Modal
              handleChange={this.handleChange}
              handleSignUp={this.handleSignUp}
              handleSignIn={this.handleSignIn}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              password={this.state.password}
              validatePassword={this.state.validatePassword}
            />
            <PageContent />
            <BuyNow />
          </CssBaseline>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
