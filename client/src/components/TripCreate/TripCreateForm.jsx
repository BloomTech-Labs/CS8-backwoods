import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TripCreate extends React.Component {
  state = {
    tripName: '',
    numberOfWaypoints: '',
    startDate: '',
    endDate: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Paper className="tripCreateForm">
          <FormControl>
            <InputLabel htmlFor="tripName">Trip Name</InputLabel>
            <Input
              id="tripName"
              value={this.state.name}
              onChange={this.handleChange('tripName')}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="numberOfWaypoints">
              Number of Waypoints
            </InputLabel>
            <Input
              id="numberOfWaypoints"
              value={this.state.name}
              type="number"
              onChange={this.handleChange('numberOfWaypoints')}
            />
          </FormControl>
          <TextField
            id="startDate"
            type="date"
            label="Start Date"
            defaultValue="2018-07-25"
            value={this.state.name}
            onChange={this.handleChange('startDate')}
          />
          <TextField
            id="endDate"
            type="date"
            label="End Date"
            defaultValue="2018-07-30"
            value={this.state.name}
            onChange={this.handleChange('endDate')}
          />
          <Button className="saveTripButton" variant="contained" type="submit">
            Save Trip
            <Icon>send</Icon>
          </Button>
        </Paper>
      </div>
    );
  }
}
export default TripCreate;
