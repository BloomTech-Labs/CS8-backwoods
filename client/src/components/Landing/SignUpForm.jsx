import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios'
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
// const encode = (data) => {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// }
class TextFields extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validatePassword: ''
    }

  }
  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false
      }
      return true
    })
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password} = this.state;
    axios.post('http://localhost:8000/signup', { firstName, lastName, email, password })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
  }
  render() {
    const { classes } = this.props;
    // noValidate autoComplete="off"
    return (
      <ValidatorForm className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          required
          id="firstName"
          label="First Name"
          className={classes.textField}
          type="text"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')} //change this
          margin="normal"
        />
        <TextField
          required
          id="lastName"
          label="Last Name"
          className={classes.textField}
          type="text"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          name="firstName"
        />
        <TextField
          required
          id="required"
          label="Email"
          className={classes.textField}
          type="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          autoComplete="email"
          margin="normal"
          name="lastName"
        />
        
          <TextValidator
            validators={['required']}
            name="password"
            required
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
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
            value={this.state.validatePassword}
            onChange={this.handleChange('validatePassword')}
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

export default withStyles(styles)(TextFields);
