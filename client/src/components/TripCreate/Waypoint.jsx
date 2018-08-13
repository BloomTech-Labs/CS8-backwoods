import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns/esm';

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
  let formatTime = format(new Date(props.wayPoint.time), 'HH:mm:ss')
  let formatDate = format(new Date(props.wayPoint.eta), 'MM/DD/YYYY');
  return (
    <ExpansionPanel
      expanded={props.expanded === `panel${props.wayPointKey}`}
      onChange={props.handleWayPointExpand(`panel${props.wayPointKey}`)}
    >
   
      
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="headline">Checkpoint Name: {props.wayPoint.markerName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      {/* <Typography
        variant="headline"
      > */}
      <div>
        {console.log(props.wayPoint)}
      ETA: {formatDate}<br/>
        Time: {formatTime}
      </div>
       
        {/* </Typography> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
