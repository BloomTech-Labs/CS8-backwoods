import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
//Started working on getting this setup with the backend
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
    firstName: '',
    lastName: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="firstName"
          label="First Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('firstName')}
          margin="normal"
        />
        <TextField
          required
          id="lastName"
          label="Last Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('lastName')}
          margin="normal"
        />
        <TextField
          required
          id="required"
          label="Email"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <TextField
          required
          id="password-input"
          label="Confirm Password"
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
