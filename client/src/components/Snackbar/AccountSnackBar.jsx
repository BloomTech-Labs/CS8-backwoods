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

const AccountSnackBar = props => {
  const {
    snackbarVertical,
    snackbarHorizontal,
    snackbarChange,
    handleSnackbarClose,
    snackbarError
  } = props;
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarVertical,
          horizontal: snackbarHorizontal
        }}
        open={snackbarChange}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <MySnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message="Changed Password Successfully!"
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
          message="Must Be Logged In To Change Password!"
        />
      </Snackbar>
    </React.Fragment>
  );
};

AccountSnackBar.propTypes = {
  snackbarVertical: PropTypes.string.isRequired,
  snackbarHorizontal: PropTypes.string.isRequired,
  snackbarChange: PropTypes.bool.isRequired,
  snackbarError: PropTypes.bool.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired
};

export default AccountSnackBar;
