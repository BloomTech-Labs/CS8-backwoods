import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import BuyNow from './components/Landing/BuyNow.jsx';
import Modal from './components/Landing/Modal.jsx';
import PageContent from './components/Landing/PageContent.jsx';


import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const MySnackbarContent = (props) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
    const { firstName, lastName, email, password } = this.state;
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
  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
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
            autoHideDuration={6000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="error"
              message="Incorrect Username/Password"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: this.state.snackbarVertical, horizontal: this.state.snackbarHorizontal }}
            open={this.state.snackbarOpen}
            onClose={this.handleSnackbarClose}
            autoHideDuration={6000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Logged in successful!"
            />
          </Snackbar>
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
