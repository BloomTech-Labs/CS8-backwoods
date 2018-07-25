import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import TripList from './TripList';
// import Trip from '../Trip/Trip';
import NewTrip from './AddNewTrip'
const TripList = []
class MainTriplist extends React.Component {
  
  addNewTrip() {
    TripList.push(NewTrip)
  }
  
  render() {
    return (
      <div>
        {TripList.map((trip, index) => {
          return (
            <div key={index}>
          
            <NewTrip />
          
          </div>
          )
          
        })}
        <Paper className="tripListEmptyPaper" elevation={1}>
        
          <Typography
            className="tripListEmptyPaper-text"
            variant="headline"
            component="h2"
          >
            Add your first trip!
          </Typography>
          <Button 
            variant="fab" 
            color="primary" 
            aria-label="Add"
            onClick={this.addNewTrip}>
            <AddIcon />
          </Button>
        </Paper>
      </div>
    );
  }
  
};

export default MainTriplist;
