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

const Waypoint = (props) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Input
          placeholder={props.wayPoint.markerName}
          inputProps={{
            'aria-label': 'Description'
          }}
          onChange={props.handleChange('markerName')}
        />

      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <InputLabel htmlFor="ETA">ETA</InputLabel>
        <TextField
          id="date"
          type="date"
          onChange={props.handleChange("eta")}
        />

        <Button className="saveTripButton" variant="contained" onClick={props.handleNewWaypoint}>
          Save Location
        <Icon>send</Icon>
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Waypoint;