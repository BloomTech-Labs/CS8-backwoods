import React from "react";
import axios from "axios";
import Archived from "./Archived";
import API_URL from "../../API_URL";
import Snackbar from "../Snackbar/Snackbar";

class GetArchived extends React.Component {
  state = {
    trips: [],
    animateList: true,
    resGet: null,
    errorGet: null,
    resArchive: null,
    errorArchive: null,
    snackbarVariant: "",
    snackbarMessage: "",
    snackbarOpen: false
  };

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
        this.setState({ trips: res.data.trips, resGet: res });
      })
      .catch(error => {
        this.setState({ errorGet: error });
      });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleSnackbarOpen = (variant, message) => {
    this.setState({
      snackbarVariant: variant,
      snackbarMessage: message,
      snackbarOpen: true
    });
  };

  UnarchiveTrip = (TripId, index) => {
    const { match, getUsersAgain } = this.props;
    const { trips } = this.state;
    const tripsCopy = [...trips];
    const token = localStorage.getItem("token");
    const id = TripId;
    axios
      .put(
        `${API_URL}/${match.params.user}/archiveTrip`,
        { id, archived: false },
        { headers: { authorization: token } }
      )
      .then(res => {
        tripsCopy.splice(index, 1);
        this.setState({ trips: tripsCopy });
        getUsersAgain();
        this.setState(
          { resArchive: res },
          this.handleSnackbarOpen("success", "Trip Uncarchived Successfully!")
        );
      })
      .catch(err => {
        this.setState(
          { errorArchive: err },
          this.handleSnackbarOpen("error", "Server cannot unarchive trip!")
        );
      });
  };

  render() {
    const { animateList, trips, ...snackbarState } = this.state;
    return (
      <div>
        <Snackbar
          handleSnackbarClose={this.handleSnackbarClose}
          {...snackbarState}
        />
        <Archived
          animateList={animateList}
          trips={trips}
          UnarchiveTrip={this.UnarchiveTrip}
        />
      </div>
    );
  }
}

export default GetArchived;
