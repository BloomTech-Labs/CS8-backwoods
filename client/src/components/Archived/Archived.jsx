import React from 'react';
import SingleAchived from './SingleAchived';

const Archived = props => {
  if (props.trips.length > 0) {
    return (
      <div className="mainTripList">
        {props.trips.map((trip, index) => {
          return (
            <SingleAchived
              tripName={trip.tripName}
              startDate={trip.startDate}
              endDate={trip.endDate}
              slug={trip.slug}
              email={trip.email}
              id={trip.id}
              UnarchiveTrip={props.UnarchiveTrip}
              index={index}
              // isLoggedIn={this.props.isLoggedIn}
              snackbarArchive={props.snackbarArchive}
              snackbarError={props.snackbarError}
              snackbarVertical={props.snackbarVertical}
              snackbarHorizontal={props.snackbarHorizontal}
              handleSnackbarClose={props.handleSnackbarClose}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="mainTripList">
        <h1>no archived trips</h1>{' '}
      </div>
    );
  }
};

export default Archived;
