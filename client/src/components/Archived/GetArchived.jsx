import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import MySnackbarContent from "../Snackbar/MySnackbarContent";
import Archived from "./Archived";
import API_URL from "../../API_URL";

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

class GetArchived extends React.Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      snackbarUnArchive: false,
      snackbarArchive: false,
      snackbarError: false,
      snackbarVertical: "top",
      snackbarHorizontal: "center",
      animateList: true
    };
    this.UnarchiveTrip = this.UnarchiveTrip.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/${match.params.user}/getArchivedTrips`,
        { email: match.params.user },
        { headers: { authorization: token } }
      )
      .then(res => {
        this.setState({ trips: res.data.trips });
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  UnarchiveTrip(TripId, index) {
    const trips = [...this.state.trips];
    const token = localStorage.getItem("token");
    const id = TripId;
    axios
      .put(
        `${API_URL}/${this.props.match.params.user}/archiveTrip`,
        { id: id, archived: false },
        { headers: { authorization: token } }
      )
      .then(res => {
        trips.splice(index, 1);
        this.setState({ trips: trips });
        console.log(res);
        this.props.getUsersAgain();
        this.setState({ snackbarUnArchive: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackbarError: true });
      });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarUnArchive: false });
    this.setState({ snackbarError: false });
  };
  render() {
    return (
      <div>
        <Archived
          animateList={this.state.animateList}
          trips={this.state.trips}
          UnarchiveTrip={this.UnarchiveTrip}
        />
        <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarUnArchive}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="success"
            message="Trip Unarchived Successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarError}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message="Server Cannot Unarchive Trip!"
          />
        </Snackbar>
      </div>
    );
  }
}

export default GetArchived;
