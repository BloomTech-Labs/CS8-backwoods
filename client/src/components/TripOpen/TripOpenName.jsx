import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const TripOpenName = (props) => {

    return (
        <Paper className="OpenTripName">
            <Typography
                className="tripname"
                variant="display1"
            >
                {props.tripName}
            </Typography>
        </Paper>
    );
}

export default TripOpenName;