import React from 'react';
import NavBar from './NavBar.jsx';
import NavBreadcrumb from './NavBreadcrumb.jsx';
import './Nav.css';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

const Nav = (props) => {
  const { classes } = props;
  return (
    <div className="navWrapper">
      <NavBreadcrumb user={props.user} />
      <NavBar user={props.user} isLoggedIn={props.isLoggedIn} checkIfTripSaved={props.checkIfTripSaved} />
      <Modal open={props.tripSavedModal} onClose={props.tripModalFalse}>
        <div style={getModalStyle()} className={classes.paper}>
          <h1>
            Your trip will not be saved if you leave this page.
            Do you want to Continue?
          </h1>
          <Link to={props.navRedirect}>
            <Button onClick={props.modalContinue}>
              Continue
          </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};


const NavWrapped = withStyles(styles)(Nav)

export default NavWrapped;
