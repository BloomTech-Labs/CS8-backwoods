import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
});
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

const ModalTripSave = (props) => {
  const {classes} = props
  return (
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
  )
}

export default withStyles(styles)(ModalTripSave);