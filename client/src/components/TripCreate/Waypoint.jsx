import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Input from '@material-ui/core/Input';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import green from '@material-ui/core/colors/green';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { TimePicker } from 'material-ui-pickers';
// import { DatePicker } from 'material-ui-pickers';


// const theme = createMuiTheme({
//   palette: {
//     primary: green
//   }
// });
const Waypoint = props => {
  return (
    <ExpansionPanel
      expanded={props.expanded === `panel${props.wayPointKey}`}
      onChange={props.handleWayPointExpand(`panel${props.wayPointKey}`)}
    >
      >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {/* <MuiThemeProvider theme={theme}>
          <Input
            placeholder={props.wayPoint.markerName}
            inputProps={{
              'aria-label': 'Description'
            }}
            // className="formSpacing"
            onChange={props.handleChange('markerName')}
          />
        </MuiThemeProvider> */}
        hello
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {/* <MuiThemeProvider theme={theme}>
        <div className="waypointControlsWrapper">
          <div className="waypointTextField">
          <div className="picker">
          <DatePicker
            label="ETA"
            showTodayButton
            disablePast
            maxDateMessage="Date must be greater than today"
            value={props.eta}
            onChange={props.handleDateChange('eta')}
            animateYearScrolling={false}
          />
        </div>
            <div className="picker">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Time"
            value={props.time}
            onChange={props.handleTimeChange}
          />
        </div>
          </div>
          <div className="waypointButtonContainer">
          <Button
            className="saveTripButton"
            variant="outlined"
            color="primary"
            onClick={props.handleNewWaypoint}
            disabled={props.saveLocationEnabled}
          >
            Save Location
            <Icon>send</Icon>
          </Button>
          </div>
        </div>
        </MuiThemeProvider> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
