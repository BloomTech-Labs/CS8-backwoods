import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tabs from './Tabs.jsx';
import { Link } from 'react-router-dom'

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
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className="signUpController">
        {this.props.isLoggedIn ? <Link to="/"><Button onClick={this.props.handleLogInOut}>log out</Button></Link> :
          <Button onClick={this.props.handleOpen}>Sign Up / Sign In</Button>

        }
        <Modal open={this.props.open} onClose={this.props.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Tabs
              handleTabChange={this.props.handleTabChange}
              tabState={this.props.tabState}
              handleChange={this.props.handleChange}
              handleSignUp={this.props.handleSignUp}
              handleSignIn={this.props.handleSignIn}
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              email={this.props.email}
              password={this.props.password}
              validatePassword={this.props.validatePassword}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
