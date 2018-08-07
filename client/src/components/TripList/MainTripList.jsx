import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SingleTrip from './SingleTrip'
import { Link } from 'react-router-dom';
import './TripList.css';
class MainTriplist extends React.Component {
  state = { animateList: true }
  render() {
    let count = 550;
    return (
      <div className="mainTripList">
        {
          this.props.trips.map((trip, index) => {
            if (index > 0) {
              count += 250;
            } else if (count > 2000) {
              count -= 250;
            }
            return (
              <div key={index}>
                <SingleTrip
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

              </div>
            )
          })}
        {this.props.isLoggedIn &&
          <Paper className="trip" id="addNewTripWrapper" elevation={1}>
            <Typography
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
                onClick={this.props.setSaveTripFalse}
              >
                <AddIcon />
              </Button>
            </Link>
          </Paper>
        }
      </div>
    );
  }

};

export default MainTriplist;
