import API_URL from '../../API_URL';
import React from 'react';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import MySnackbarContent from '../Snackbar/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import './Account.css';
import { Typography } from '../../../node_modules/@material-ui/core';
const theme = createMuiTheme({
  palette: {
    primary: green
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white'
      }
    }
  }
});
const styles = theme => ({
  button: {
    margin: 'auto',
    textAlign: 'center'
  }
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // }
});

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class AccountForm extends React.Component {
  state = {
    email: '',
    password: '',
    oldPassword: '',
    snackbarChange: false,
    snackbarError: false,
    snackbarVertical: 'top',
    snackbarHorizontal: 'center'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { email, password } = this.state;
    axios
      .put(
        `${API_URL}/trips/settings`,
        { email, password },
        { headers: { authorization: token } }
      )
      .then(res => {
        this.setState({ snackbarChange: true });
        console.log(res.data);
      })
      .catch(error => {
        this.setState({ snackbarError: true });
        console.log(error);
      });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarChange: false });
    this.setState({ snackbarError: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fade in={true}>
        <div className="accountWrapper">
          <Paper className="formPaper">
            <Typography variant="headline">Change Password</Typography>
            <form onSubmit={this.handleSubmit} className="accountForm">
              <div className="accountTextFieldWrapper">
                <MuiThemeProvider theme={theme}>
                  <TextField
                    required
                    id="required"
                    label="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    autoComplete="email"
                    // className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    required
                    // id="password-input"
                    label="Old Password"
                    value={this.state.oldPassword}
                    onChange={this.handleChange('oldPassword')}
                    // className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                  <TextField
                    required
                    // id="password-input"
                    label="New Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    // className={classes.textField}
                    type="password"
                    margin="normal"
                  />
                </MuiThemeProvider>
              </div>

              <div className="accountSubmitWrapper">
                <MuiThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    type="submit"
                    color="primary"
                  >
                    Submit
                    <Icon className="accountSubmitIcon">send</Icon>
                  </Button>
                </MuiThemeProvider>
              </div>
            </form>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: this.state.snackbarVertical,
              horizontal: this.state.snackbarHorizontal
            }}
            open={this.state.snackbarChange}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="success"
              message="Changed Password Successfully!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: this.state.snackbarVertical,
              horizontal: this.state.snackbarHorizontal
            }}
            open={this.state.snackbarError}
            onClose={this.handleSnackbarClose}
            autoHideDuration={2000}
          >
            <MySnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant="error"
              message="Must Be Logged In To Change Password!"
            />
          </Snackbar>
        </div>
      </Fade>
    );
  }
}

export default withStyles(styles)(AccountForm);
