import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';

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

class SignInForm extends React.Component {
  state = {
    email: '',
    password: '',
    open: false,
    vertical: 'top',
    horizontal: 'center'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:8000/login', { email, password })
      .then(res => {
        this.setState({ open: true })
        console.log(res);
        console.log(res.data)
      }).catch(error => {
        this.setState({ open: true })
        console.log("INCORRECT USERNAME/PASSWORD")
      })
  }

  render() {
    const { classes } = this.props;

    // noValidate autoComplete="off"
    return (
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
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <div className="submitButton">
          <Button variant="contained" className={classes.button} type="submit">
            Submit
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: this.state.vertical, horizontal: this.state.horizontal }}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': "message-id" }}
          autoHideDuration={6000}
          message={<span id="message-id">Incorrect Username/Password</span>}
        />
        <Snackbar
          anchorOrigin={{ vertical: this.state.vertical, horizontal: this.state.horizontal }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={6000}
          ContentProps={{ 'aria-describedby': "message-id1" }}
          message={<span id="message-id1">Logged in successful!</span>}
        />
      </form>
    );
  }
}

export default withStyles(styles)(SignInForm);
