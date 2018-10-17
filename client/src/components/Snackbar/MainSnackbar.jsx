import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import MySnackbarContent from "./MySnackbarContent";

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
// snackbarUserDoesNotExist

const MainSnackbar = props => {
  const {
    snackbarVertical,
    snackbarHorizontal,
    snackbarLogOut,
    handleSnackbarClose,
    snackbarPasswordMismatch,
    snackbarUserDoesNotExist,
    snackbarOpenSignIn,
    snackbarOpenSignUp,
    snackbarOpenSignUpError,
    snackbarAuthRedirect
  } = props;
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarLogOut}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Logged out successfully!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarPasswordMismatch}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="error"
          message="Password does not match"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarUserDoesNotExist}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="error"
          message="User does not exist"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarOpenSignIn}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Logged in successful!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarOpenSignUp}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="User successfully created!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarOpenSignUpError}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="error"
          message="User already exists!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarAuthRedirect}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="error"
          message="Please Sign In"
        />
      </Snackbar>
    </React.Fragment>
  );
};

MainSnackbar.propTypes = {
  snackbarOpenSignIn: PropTypes.bool.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  snackbarVertical: PropTypes.string.isRequired,
  snackbarLogOut: PropTypes.bool.isRequired,
  snackbarHorizontal: PropTypes.string.isRequired,
  snackbarPasswordMismatch: PropTypes.bool.isRequired,
  snackbarUserDoesNotExist: PropTypes.bool.isRequired,
  snackbarOpenSignUp: PropTypes.bool.isRequired,
  snackbarOpenSignUpError: PropTypes.bool.isRequired,
  snackbarAuthRedirect: PropTypes.bool.isRequired
};

export default MainSnackbar;
