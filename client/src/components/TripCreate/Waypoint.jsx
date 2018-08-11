import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
      
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>Checkpoint Name: {console.log(props)}</Typography>
        hello
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
       blblblblblblb
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Waypoint;
