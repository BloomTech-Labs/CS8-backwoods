import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
<<<<<<< HEAD:client/src/components/TripList/AddNewTrip.jsx
import '../../index.css';
const Trip = props => {
=======
import { Link } from 'react-router-dom';
import '../../index.css'
const Trip = (props) => {
>>>>>>> master:client/src/components/TripList/Trip.jsx
  return (
  <Link to={`/${props.email}/${props.slug}`} style={{textDecoration: "none"}}>
    <div className="createNew">
      <Paper className="tripListPaper" elevation={1}>
        <Typography
          className="tripListPaper-text"
          variant="headline"
          component="h2"
        >
<<<<<<< HEAD:client/src/components/TripList/AddNewTrip.jsx
          {props.tripName}
        </Typography>
        <div className="createNew">
          Start Date: {props.startDate} End Date: {props.endDate}{' '}
        </div>
      </Paper>
    </div>
  );
};
=======
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
>>>>>>> master:client/src/components/TripList/Trip.jsx

export default Trip;
