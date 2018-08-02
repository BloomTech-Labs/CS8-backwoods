import React from 'react';
import SingleAchived from './SingleAchived';

const Archived = (props) => {
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
        )
      })}
    </div>
  )
}

export default Archived