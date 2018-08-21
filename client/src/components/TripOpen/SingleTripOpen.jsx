import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { format } from 'date-fns/esm';


const SingleTripOpen = props => {
  let formatDate = format(new Date(props.marker.eta), 'MM/DD/YYYY');
  return (
    <Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Checkpoint Name: {props.marker.markerName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>ETA: {formatDate} Time: {props.marker.time}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};
export default SingleTripOpen;
