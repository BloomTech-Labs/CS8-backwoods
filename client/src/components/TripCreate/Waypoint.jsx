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
import InputLabel from '@material-ui/core/InputLabel';

const Waypoint = props => {
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
          defaultValue="2018-09-25"
          className="spacingRight"
          onChange={props.handleChange('eta')}
        />

        <Button
          className="saveTripButton"
          variant="contained"
          onClick={props.handleNewWaypoint}
          disabled={!props.markerEnabled}
        >
          Save Location
          <Icon>send</Icon>
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
