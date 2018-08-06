import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import Icon from '@material-ui/core/Icon';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const Waypoint = props => {
  return (
    <ExpansionPanel
      expanded={props.expanded === `panel${props.wayPointKey}`}
      onChange={props.handleWayPointExpand(`panel${props.wayPointKey}`)}
    >
      >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <MuiThemeProvider theme={theme}>
          <Input
            placeholder={props.wayPoint.markerName}
            inputProps={{
              'aria-label': 'Description'
            }}
            className="formSpacing"
            onChange={props.handleChange('markerName')}
          />
        </MuiThemeProvider>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <MuiThemeProvider theme={theme}>
          <TextField
            label="ETA"
            id="date"
            type="date"
            defaultValue={props.eta}
            className="spacingRight"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.handleChange('eta')}
          />

          <TextField
            label="Time"
            id="time"
            type="time"
            className="spacingRight"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.handleChange('time')}
          />
          <Button
            className="saveTripButton"
            variant="contained"
            color="primary"
            onClick={props.handleNewWaypoint}
            disabled={props.saveLocationEnabled}
          >
            Save Location
            <Icon>send</Icon>
          </Button>
        </MuiThemeProvider>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
