import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import '../../index.css'
const Trip = (props) => {
  const TripView = {
    pathname: `/${props.email}/${props.slug}`,
    param1: props.id,
    param2: props.tripName,
    param3: props.startDate,
    param4: props.endDate
  }
  return (
    <Link to={TripView} style={{ textDecoration: "none" }}>
      <div className="createNew">
        <Paper className="tripListEmptyPaper" elevation={1}>
          <Typography
            className="tripListEmptyPaper-text"
            variant="headline"
            component="h2"
          >
            {props.tripName}

          </Typography>
          <div className="createNew">
            Start Date: {props.startDate}
            {" "}
            End Date: {props.endDate}{" "}
          </div>

        </Paper>
      </div>
    </Link>
  )
}

export default Trip