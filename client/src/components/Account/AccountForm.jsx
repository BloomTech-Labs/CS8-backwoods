import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import MySnackbarContent from './Snackbar.js';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';

// import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
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
    oldPassword: ''
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
    axios.put('http://localhost:8000/trips/settings', { email, password }, { headers: { authorization: token } })
      .then(res => {
        console.log(res);
        console.log(res.data)
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className="formPaper">
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <TextField
              required
              id="required"
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              autoComplete="email"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              required
              id="password-input"
              label="Old Password"
              value={this.state.oldPassword}
              onChange={this.handleChange('oldPassword')}
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <TextField
              required
              id="password-input"
              label="New Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              className={classes.textField}
              type="password"
              margin="normal"
            />
            <div className="submitButton">
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
              >
                {' '}
                <br />
                Submit
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AccountForm);
