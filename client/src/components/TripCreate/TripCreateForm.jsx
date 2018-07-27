import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class TripCreate extends React.Component {
  state = {
    tripName: '',
    numberOfWaypoints: '',
    startDate: '',
    endDate: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const { tripName, startDate, endDate } = this.state;
    axios.post(`http://localhost:8000/createTrips`, { tripName, startDate, endDate }, { headers: { authorization: token } })
      .then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Paper className="tripCreateForm">
            <FormControl>
              <InputLabel htmlFor="tripName">Trip Name</InputLabel>
              <Input
                id="tripName"
                value={this.state.tripName}
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
            <InputLabel htmlFor="startDate">Start Date</InputLabel>
            <TextField
              id="startDate"
              type="date"
              value={this.state.startDate}
              onChange={this.handleChange('startDate')}
            />
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <TextField
              id="endDate"
              type="date"
              value={this.state.endDate}
              onChange={this.handleChange('endDate')}
            />
            <Button className="saveTripButton" variant="contained" type="submit">
              Save Trip
            <Icon>send</Icon>
            </Button>
          </Paper>
        </div>
      </form>
    );
  }
}
export default TripCreate;
