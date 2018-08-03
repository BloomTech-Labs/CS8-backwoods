import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SingleTripOpen from './SingleTripOpen';

const WaypointList = props => {
  return (
    <Paper className="tripInfo">
      <Typography className="tripInfo-startdate">
        Start: {props.startDate}
      </Typography>
      <Typography className="tripInfo-endddate">
        End: {props.endDate}
      </Typography>
      {props.markers.map((marker, index) => {
        return <SingleTripOpen marker={marker} />;
      })}
    </Paper>
  );
};

export default WaypointList;
