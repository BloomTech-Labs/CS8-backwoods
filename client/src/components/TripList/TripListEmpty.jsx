import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const TripListEmpty = () => {
  return (
    <div className="tripList">
      <Paper className="tripListPaper" elevation={1}>
        <Typography
          className="tripListPaper-text"
          variant="headline"
          component="h2"
        >
          Add your first trip!
        </Typography>
        <Button variant="fab" color="primary" aria-label="Add">
          <AddIcon />
        </Button>
      </Paper>
    </div>
  );
};

export default TripListEmpty;
