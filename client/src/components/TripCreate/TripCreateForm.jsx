import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';


const TripCreateForm = (props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Paper className="tripCreateForm">
            <FormControl>
              <InputLabel htmlFor="tripName">Trip Name</InputLabel>
              <Input
                id="tripName"
                value={props.tripName}
                onChange={props.handleChange('tripName')}
              />
            </FormControl>
            <InputLabel htmlFor="startDate">Start Date</InputLabel>
            <TextField
              id="startDate"
              type="date"
              value={props.startDate}
              onChange={props.handleChange('startDate')}
            />
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <TextField
              id="endDate"
              type="date"
              value={props.endDate}
              onChange={props.handleChange('endDate')}
            />
            <Button className="saveTripButton" variant="contained" type="submit">
              Save Trip
        <Icon>send</Icon>
            </Button>
          </Paper>
        </div>
      </form>
      {props.fireRedirect && (
        <Redirect to={`/${props.email}`} />
      )}
    </React.Fragment>
  )

}
export default TripCreateForm;
