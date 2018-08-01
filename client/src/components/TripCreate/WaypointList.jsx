import React from 'react';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import WayPoint from './Waypoint';

const WaypointList = (props) => {
  return (
    <Paper className="WaypointListWrapper">
      <Typography>Start</Typography>
      {props.wayPoints.map((wayPoint, index) => {
        return (
          <WayPoint 
            wayPoint={wayPoint}
            wayPointKey={index}
            key={index}
            handleChange={props.handleChange}
            activateMap={props.activateMap}
            handleNewWaypoint={props.handleNewWaypoint}
            disableAddMarker={props.disableAddMarker}
            handleWayPointExpand={props.handleWayPointExpand}
            expanded={props.expanded}
          />
        )
      })}
          
            <Button variant="contained" onClick={() => props.addWaypoint()} disabled={props.disableAddMarker}>
              <Icon>add</Icon>
              Add Marker
              
            </Button>
          <Button variant="contained" onClick={props.removeMarker} disabled={props.disableRemoveMarker}>
              <Icon>delete</Icon>
              Remove Marker
              
            </Button>
          <Typography>End</Typography>
        
    </Paper>
  );
}

export default WaypointList;
