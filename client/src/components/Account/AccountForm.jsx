import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

class AccountForm extends React.Component {
  state = {
    email: '',
    password: '',
    newPassword: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { email, password } = this.state;
  //   axios.post('http://localhost:8000/login', { email, password })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data)
  //     })
  // }

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
              value={this.state.password}
              onChange={this.handleChange('password')}
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <TextField
              required
              id="password-input"
              label="New Password"
              value={this.state.newPassword}
              onChange={this.handleChange('newPassword')}
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
