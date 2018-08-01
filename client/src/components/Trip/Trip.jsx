import React from 'react';
// import Map from './Map.jsx';
import TripOpen from './TripOpen.jsx';
import TripOpenName from './TripOpenName';

class Trip extends React.Component {

  render() {
    return (
      <div>
        {
          this.props.trips.map((trip, index) => {
            return (
              <div key={index}>

                <TripOpenName
                  tripName={trip.tripName}
                />
                <TripOpen
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                />
              </div>
            )
          })
        }
      </div>
    );
  };
}

export default Trip;
