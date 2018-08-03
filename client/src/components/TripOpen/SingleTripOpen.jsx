import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

const SingleTripOpen = props => {
  return (
    <Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Checkpoint Name: {props.marker.markerName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>ETA: {props.marker.eta}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};
export default SingleTripOpen;
