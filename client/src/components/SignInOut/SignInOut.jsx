import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tabs from './Tabs.jsx';
import { Link } from 'react-router-dom';
import './SignInOut.css';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});
const SignInOut = props => {
  const { classes } = props;
  return (
    <div className="signInOutWrapper">
      {props.isLoggedIn ? (
        <Link to="/">
          <Button onClick={props.handleLogOut}>log out</Button>
        </Link>
      ) : (
        <Button onClick={props.handleOpen}>Sign Up / Sign In</Button>
      )}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        disableAutoFocus={true}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Tabs
            handleTabChange={props.handleTabChange}
            tabState={props.tabState}
            handleChange={props.handleChange}
            handleSignUp={props.handleSignUp}
            handleSignIn={props.handleSignIn}
            firstName={props.firstName}
            lastName={props.lastName}
            email={props.email}
            password={props.password}
            validatePassword={props.validatePassword}
          />
        </div>
      </Modal>
    </div>
  );
};

SignInOut.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SignInOutWrapped = withStyles(styles)(SignInOut);

export default SignInOutWrapped;
