import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import WayPoint from './Waypoint';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
const addTheme = createMuiTheme({
  palette: {
    primary: blue
  }
});
const removeTheme = createMuiTheme({
  palette: {
    primary: red
  }
});
const WaypointList = props => {
  return (
    <Paper className="WaypointListWrapper">
      <Typography>Start</Typography>
      {props.wayPoints.map((wayPoint, index) => {
        return (
          <WayPoint
            eta={props.eta}
            wayPoint={wayPoint}
            wayPointKey={index}
            key={index}
            handleChange={props.handleChange}
            activateMap={props.activateMap}
            handleNewWaypoint={props.handleNewWaypoint}
            disableAddMarker={props.disableAddMarker}
            handleWayPointExpand={props.handleWayPointExpand}
            expanded={props.expanded}
            saveLocationEnabled={props.saveLocationEnabled}
          />
        );
      })}
      <MuiThemeProvider theme={addTheme}>
        <Button
          variant="contained"
          onClick={() => props.addWaypoint()}
          disabled={props.disableAddMarker}
          color="primary"
        >
          <Icon>add</Icon>
          Add
        </Button>
      </MuiThemeProvider>
      <MuiThemeProvider theme={removeTheme}>
        <Button
          variant="contained"
          onClick={props.removeMarker}
          disabled={props.disableRemoveMarker}
          color="primary"
        >
          <Icon>delete</Icon>
          Remove
        </Button>
        <Typography>End</Typography>
      </MuiThemeProvider>
    </Paper>
  );
};

export default WaypointList;
