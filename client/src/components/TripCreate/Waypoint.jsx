import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelForm from './ExpansionPanelForm';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const Waypoint = (props) => {
  return (
    <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>
      <Input
        placeholder={props.wayPoint.markerName}
        inputProps={{
          'aria-label': 'Description'
        }}
        onChange={props.handleChange('markerName')}
      />
      </Typography>
  
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
        {/* <Typography> */}
        {/* <form> */}
      <TextField
        id="date"
        label="ETA"
        type="date"
        defaultValue="2017-05-24"
        onChange={props.handleChange("eta")}
        // InputLabelProps={{
        //   shrink: true
        // }}
      />
     
      <Button className="saveTripButton" variant="contained" type="submit">
        Select Location
        <Icon>send</Icon>
      </Button>
    {/* </form>
        </Typography> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Waypoint;