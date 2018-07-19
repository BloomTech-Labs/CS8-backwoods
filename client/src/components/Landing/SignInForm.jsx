import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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

class TextFields extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:8000/login', { email, password })
      .then(res => {
        console.log(res);
        console.log(res.data)
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
          <Button variant="contained" className={classes.button}>
            Submit
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(TextFields);
