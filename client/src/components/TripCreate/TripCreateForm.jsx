import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

const TripCreateForm = props => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Paper className="tripCreateForm">
            <FormControl>
              <InputLabel htmlFor="name-simple" className="spacingLeft">
                Name
              </InputLabel>
              <Input
                id="tripName"
                label="Trip Name"
                className="spacingLeft"
                value={props.tripName}
                onChange={props.handleChange('tripName')}
              />
            </FormControl>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              defaultValue="2018-07-25"
              className="spacingLeft spacingRight"
              value={props.startDate}
              onChange={props.handleChange('startDate')}
            />
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              className="spacingRight"
              defaultValue="2018-07-25"
              value={props.endDate}
              onChange={props.handleChange('endDate')}
            />
            <Button
              variant="contained"
              type="submit"
              // class="saveTripButton"
              disabled={!props.isEnabled}
            >
              Save Trip
              <Icon>send</Icon>
            </Button>
          </Paper>
        </div>
      </form>
      {props.fireRedirect && <Redirect to={`/${props.email}`} />}
    </React.Fragment>
  );
};
export default TripCreateForm;
