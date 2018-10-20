import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import MySnackbarContent from "./MySnackbarContent";

const styles = theme => ({
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

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

const UserSnackbar = props => {
  const {
    snackbarHorizontal,
    snackbarVertical,
    handleSnackbarClose,
    snackbarArchive,
    snackbarError
  } = props;
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarArchive}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Trip Archived Successfully!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarError}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="error"
          message="Server Cannot Archive Trip!"
        />
      </Snackbar>
    </React.Fragment>
  );
};

UserSnackbar.propTypes = {
  snackbarVertical: PropTypes.string.isRequired,
  snackbarHorizontal: PropTypes.string.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  snackbarArchive: PropTypes.bool.isRequired,
  snackbarError: PropTypes.bool.isRequired
};

export default UserSnackbar;
