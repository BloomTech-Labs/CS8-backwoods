import React from "react";
import axios from "axios";
import Archived from "./Archived";
import API_URL from "../../API_URL";
import ArchivedSnackBar from "../Snackbar/ArchivedSnackBar";

class GetArchived extends React.Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      snackbarUnArchive: false,
      snackbarError: false,
      snackbarVertical: "top",
      snackbarHorizontal: "center",
      animateList: true,
      resGet: null,
      errorGet: null,
      resArchive: null,
      errorArchive: null
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
    this.setState({ snackbarUnArchive: false });
    this.setState({ snackbarError: false });
  };

  UnarchiveTrip(TripId, index) {
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
        this.setState({ snackbarUnArchive: true, resArchive: res });
      })
      .catch(err => {
        this.setState({ snackbarError: true, errorArchive: err });
      });
  }

  render() {
    const { animateList, trips, ...snackbarState } = this.state;
    return (
      <div>
        <ArchivedSnackBar
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
