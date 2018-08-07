import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MapImg from '../TripList/Google-Maps.jpg'
import './Archived.css';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const SingleAchived = (props) => {
  const TripOpen = {
    pathname: `/${props.email}/${props.slug}`,
    param1: props.id,
    param2: props.tripName,
    param3: props.startDate,
    param4: props.endDate
  }

  return (
    <Grow
    in={props.animateList}
    style={{ transformOrigin: '0 0 0' }}
    {...(props.animateList ? { timeout: props.count } : {})}
  >
    <Paper className="trip2" elevation={1}>
      <Link to={TripOpen} style={{ textDecoration: "none" }}>
        <Typography
          variant="display1"
          component="h2"
          className="TripTitle"
        >
          {props.tripName}
        </Typography>
        <img src={MapImg} alt="" className="mapsIcon" />
      </Link>
      <div className="tripDatesWrapper">
        <div className="tripdates">
          <span className="SingleTripStartAndEndDate">
            Start Date: {props.startDate}
          </span>
          {" "}
          <span className="SingleTripStartAndEndDate">
            End Date: {props.endDate}
          </span>
          {" "}
        </div>
        <MuiThemeProvider theme={theme}>
          <Button 
            onClick={
              () => props.UnarchiveTrip(props.id, props.index)}
              variant="contained" color="primary"
            >
            Unarchive
          </Button>
        </MuiThemeProvider>
      </div>
    </Paper>
  </Grow>
  )
}

export default SingleAchived