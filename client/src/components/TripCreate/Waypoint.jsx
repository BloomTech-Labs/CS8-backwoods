import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


const Waypoint = props => {
  return (
    <ExpansionPanel
      expanded={props.expanded === `panel${props.wayPointKey}`}
      onChange={props.handleWayPointExpand(`panel${props.wayPointKey}`)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="headline">Checkpoint Name: {props.wayPoint.markerName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          ETA: {props.wayPoint.eta}<br/>
          Time: {props.wayPoint.time}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
