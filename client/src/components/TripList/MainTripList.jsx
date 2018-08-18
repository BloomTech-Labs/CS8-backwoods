import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SingleTrip from './SingleTrip';
import { Link } from 'react-router-dom';
import './TripList.css';
import Grow from '@material-ui/core/Grow';

class MainTriplist extends React.Component {
  state = { animateList: true };
  render() {
    let count = 550;
    let tripsLenght =  250 * this.props.trips.length;
    let addButtonCount = count + tripsLenght;
    return (
      <div>
        {this.props.trips.map((trip, index) => {
          if (index > 0) {
            count += 250;
          } else if (count > 2000) {
            count -= 250;
          }
          return (
            
              <SingleTrip
                key={index}
                tripName={trip.tripName}
                animateList={this.state.animateList}
                count={count}
                createdAt={trip.createdAt}
                updatedAt={trip.updatedAt}
                startDate={trip.startDate}
                endDate={trip.endDate}
                slug={trip.slug}
                email={trip.email}
                id={trip.id}
                archiveTrip={this.props.archiveTrip}
                index={index}
                isLoggedIn={this.props.isLoggedIn}
              />
           
          );
        })}
        {this.props.isLoggedIn && (
          <Grow
            in={this.state.animateList}
            style={{ transformOrigin: '0 0 0' }}
            {...(this.state.animateList ? { timeout: addButtonCount } : {})}
          >
          <Paper className="trip" id="addNewTripWrapper" elevation={1}>
            <Typography variant="headline" component="h2">
              Add a trip!
            </Typography>
            <Link to={`/${this.props.user}/create`}>
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                onClick={this.props.setSaveTripFalse}
              >
                <AddIcon />
              </Button>
            </Link>
          </Paper>
          </Grow>
        )}
      </div>
    );
  }
}

export default MainTriplist;
