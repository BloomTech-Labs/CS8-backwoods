import React from 'react';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import WayPoint from './Waypoint';

const WaypointList = (props) => {
  return (
    <Paper className="expansionPanels">
      <Typography>Start</Typography>
      {props.wayPoints.map((wayPoint, index) => {
        return (
         <WayPoint 
            wayPoint={wayPoint}
            wayPointKey={index}
            key={index}
            handleChange={props.handleChange}
          />
        )
      })}
          
            <Button className="saveTripButton" variant="contained" onClick={props.addWaypoint}>
              <Icon>add</Icon>
              Add Marker
              
            </Button>
          <Button className="saveTripButton" variant="contained">
              <Icon>delete</Icon>
              Remove Marker
              
            </Button>
          <Typography>End</Typography>
        
    </Paper>
  );
}

export default WaypointList;
