import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MapImg from './Google-Maps.jpg'


const SingleTrip = (props) => {
  const TripOpen = {
    pathname: `/${props.email}/${props.slug}`,
    param1: props.id,
    param2: props.tripName,
    param3: props.startDate,
    param4: props.endDate
  }

  return (
    <Paper className="trip" elevation={1}>
      <Link to={TripOpen} style={{ textDecoration: "none" }}>
        <Typography
          variant="headline"
          component="h2"
          className="TripTitle"
        >
          {props.tripName}
        </Typography>
        <img src={MapImg} alt="" className="mapsIcon" />
      </Link>
      <div className="tripDatesWrapper">
        <div className="tripdates">
          <span>
            Start Date: {props.startDate}
          </span>
          {" "}
          <span>
            End Date: {props.endDate}
          </span>
          {" "}
        </div>
        {props.isLoggedIn && 
          <button onClick={() => props.archiveTrip(props.id, props.index)}>Archive</button>
        }
      </div>
    </Paper>
  )
}

export default SingleTrip