import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Trip from './AddNewTrip'
import { Link } from 'react-router-dom';

class MainTriplist extends React.Component {


  render() {
    return (
      <div>
        {
          this.props.trips.map((trip, index) => {
            return (
              <div key={index}>

                <Trip tripName={trip.tripName}
                  createdAt={trip.createdAt}
                  updatedAt={trip.updatedAt}
                  startDate={trip.startDate}
                  endDate={trip.endDate} />

              </div>
            )

          })}
        {console.log(this.props.trips)}
        <Paper className="tripListEmptyPaper" elevation={1}>

          <Typography
            className="tripListEmptyPaper-text"
            variant="headline"
            component="h2"
          >
            Add your first trip!
          </Typography>
          <Link to={`/${this.props.user}/create`}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              onClick={this.props.addNewTrip}>
              <AddIcon />
            </Button>
          </Link>
        </Paper>
      </div>
    );
  }

};

export default MainTriplist;
