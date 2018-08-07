import React from 'react';
import NavBar from './NavBar.jsx';
import NavBreadcrumb from './NavBreadcrumb.jsx';
import './Nav.css';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '400px',
    height: '250px',
    padding: '1% 2% 2% 2%',
    textAlign: 'center'
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

const Nav = props => {
  const { classes } = props;
  return (
    <div className="navWrapper">
      <NavBreadcrumb user={props.user} />
      <NavBar
        user={props.user}
        isLoggedIn={props.isLoggedIn}
        checkIfTripSaved={props.checkIfTripSaved}
      />
      <Modal
        open={props.tripSavedModal}
        onClose={props.tripModalFalse}
        disableAutoFocus={true}
      >
        <Fade in={props.tripSavedModal}>
          <Paper
            style={getModalStyle()}
            className={classes.paper}
            elevation={4}
          >
            <Typography variant="headline">
              Your trip will not be saved if you leave this page.<br />
              <br /> Do you want to continue?
            </Typography>
            <div className="stayOrLeaveButtons">
              <Button onClick={props.tripModalFalse}>Stay</Button>
              <Link className="leaveButton" to={props.navRedirect}>
                <Button onClick={props.modalContinue}>Leave</Button>
              </Link>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

const NavWrapped = withStyles(styles)(Nav);

export default NavWrapped;
