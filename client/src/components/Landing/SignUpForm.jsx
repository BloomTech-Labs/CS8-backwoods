import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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

class SignUpForm extends React.Component {
  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.props.password) {
        return false
      }
      return true
    })
  }

  render() {
    const { classes } = this.props;
    // noValidate autoComplete="off"
    return (
      <ValidatorForm className={classes.container} onSubmit={this.props.handleSignUp}>
        <TextField
          required
          id="firstName"
          label="First Name"
          className={classes.textField}
          type="text"
          value={this.props.firstName}
          onChange={this.props.handleChange('firstName')}
          margin="normal"
          name="firstName"
        />
        <TextField
          required
          id="lastName"
          label="Last Name"
          className={classes.textField}
          type="text"
          value={this.props.lastName}
          onChange={this.props.handleChange('lastName')}
          margin="normal"
          name="lastName"
        />
        <TextField
          required
          id="required"
          label="Email"
          className={classes.textField}
          type="email"
          value={this.props.email}
          onChange={this.props.handleChange('email')}
          autoComplete="email"
          margin="normal"
          name="email"
        />

        <TextValidator
          validators={['required']}
          name="password"
          required
          id="password-input"
          label="Password"
          className={classes.textField}
          type="password"
          value={this.props.password}
          onChange={this.props.handleChange('password')}
          autoComplete="current-password"
          margin="normal"
          errorMessages={['this field is required']}
        />
        <TextValidator
          validators={['isPasswordMatch', 'required']}
          name="repeatPassword"
          required
          id="password-input"
          label="Confirm Password"
          className={classes.textField}
          type="password"
          value={this.props.validatePassword}
          onChange={this.props.handleChange('validatePassword')}
          autoComplete="current-password"
          margin="normal"
          errorMessages={['password mismatch', 'this field is required']}
        />

        <div className="submitButton">
          <Button variant="contained" className={classes.button} type="submit">
            Submit
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(SignUpForm);
