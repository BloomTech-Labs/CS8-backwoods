import React from 'react';
import SingleAchived from './SingleAchived';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import './Archived.css';

const Archived = props => {
  if (props.trips.length > 0) {
    return (
      <div className="mainTripList">
        {props.trips.map((trip, index) => {
          return (
            <SingleAchived
              key={index}
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
    <Fade in={true}>
      <div className="mainTripList">
        <Paper className="noArchivedTripsPaper">
          <Typography variant="headline">No archived trips!</Typography>
        </Paper>
      </div>
    </Fade>
    
    );
  }
};

export default Archived;