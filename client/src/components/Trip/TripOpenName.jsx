import React from 'react';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

const TripOpenName = (props) => {

    return (
        <Paper className="TripOpenName">
            <Typography
                className="tripname"
                variant="h2"
            >

                {props.tripName}
            </Typography>
        </Paper>
    );
}

export default TripOpenName;