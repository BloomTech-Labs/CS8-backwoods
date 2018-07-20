import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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

const SignInForm = (props)  => {
    const { classes } = props;

    // noValidate autoComplete="off"
    return (
      <form className={classes.container} onSubmit={props.handleSignIn}>
        <TextField
          required
          id="required"
          label="Email"
          type="email"
          value={props.email}
          onChange={props.handleChange('email')}
          autoComplete="email"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          value={props.password}
          onChange={props.handleChange('password')}
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
      </form>
    );
  }


export default withStyles(styles)(SignInForm);
