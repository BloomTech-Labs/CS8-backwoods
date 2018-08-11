import React from 'react';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const styles = {
  card: {
    minWidth: 275,
  },
  button: {
    margin: theme.spacing.unit,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const WaypointCreateCard = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Collapse in={props.displayMarkerCard}>
        <Card className={classes.card}>
          <CardContent>
          <MuiThemeProvider theme={theme}>
          <Input
            placeholder='Marker Name here'
            className="markerName"
            inputProps={{
              'aria-label': 'Description'
            }}
            onChange={props.handleChange('markerName')}
          />
        <div className="waypointControlsWrapper">
          <div className="waypointTextField">
          <div className="datePicker">
          <DatePicker
            label="ETA"
            showTodayButton
            disablePast
            initialFocusedDate={props.startDate}
            minDate={props.startDate}
            maxDate={props.endDate}
            minDateMessage="ETA must be greater then trip start date"
            maxDateMessage="ETA must be less than trip end date"
            value={props.eta}
            onChange={props.handleDateChange('eta')}
            animateYearScrolling={false}
            className="pickerCard"
          />
        </div>
            <div className="timePicker">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Time"
            value={props.time}
            onChange={props.handleTimeChange}
            className="pickerCard"
          />
        </div>
          </div>
          <div className="waypointButtonContainer">
          {
          props.lat === null ?
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={props.activateMap}
            // disabled={props.saveLocationEnabled}
            size="large"
          >
            Place Marker
            <Icon>send</Icon>
          </Button>
          :

          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={props.handleNewWaypoint}
            // disabled={props.saveLocationEnabled}
            size="large"
          >
          
            Save Location
            <Icon>send</Icon>
          </Button>
          }
          </div>
        </div>
        </MuiThemeProvider>
        </CardContent>
      </Card>
      </Collapse>
    </React.Fragment>
  )
}

export default withStyles(styles)(WaypointCreateCard)