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
          />
        )
      })}
    </div>
  )
}

export default Archived