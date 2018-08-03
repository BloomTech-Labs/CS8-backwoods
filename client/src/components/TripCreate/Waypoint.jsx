import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpansionPanelForm from './ExpansionPanelForm';
import Input from '@material-ui/core/Input';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const Waypoint = props => {
  // let date = new Date().toISOString().split('T')[0];
  // console.log(date);
  return (
    <ExpansionPanel
      expanded={props.expanded === `panel${props.wayPointKey}`}
      onChange={props.handleWayPointExpand(`panel${props.wayPointKey}`)}
    >
      >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Input
          placeholder={props.wayPoint.markerName}
          inputProps={{
            'aria-label': 'Description'
          }}
          className="formSpacing"
          onChange={props.handleChange('markerName')}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TextField
          label="ETA"
          id="date"
          type="date"
          // defaultValue={props.wayPoint.eta}
          className="spacingRight"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={props.handleChange('eta')}
        />

        <TextField
          label="Time"
          id="time"
          type="time"
          className="spacingRight"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={props.handleChange('time')}
        />

        <Button
          className="saveTripButton"
          variant="contained"
          onClick={props.handleNewWaypoint}
          disabled={props.saveLocationEnabled}
        >
          Save Location
          <Icon>send</Icon>
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
