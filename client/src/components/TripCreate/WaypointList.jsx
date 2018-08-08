import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import WayPoint from './Waypoint';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
      
      <Typography
        variant="display1"
        component="h3"
      >Start
      </Typography>
      
    <div class="waypointContainer">
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
    </div>
      <div className="waypointButtonWrapper">
        <MuiThemeProvider theme={addTheme}>
          <Button
            size="large"
            variant="outlined"
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
            size="large"
            variant="outlined"
            onClick={props.removeMarker}
            disabled={props.disableRemoveMarker}
            color="primary"
          >
          <Icon>delete</Icon>
          Remove
        </Button>
        
        </MuiThemeProvider>
      </div>
    <Typography
          variant="display1"
          component="h3"
        >
        End
        </Typography>
    </Paper>
  );
};

export default WaypointList;
