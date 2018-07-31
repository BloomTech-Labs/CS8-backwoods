import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../../index.css';
const Trip = props => {
  return (
    <div className="createNew">
      <Paper className="tripListPaper" elevation={1}>
        <Typography
          className="tripListPaper-text"
          variant="headline"
          component="h2"
        >
          {props.tripName}
        </Typography>
        <div className="createNew">
          Start Date: {props.startDate} End Date: {props.endDate}{' '}
        </div>
      </Paper>
    </div>
  );
};

export default Trip;
