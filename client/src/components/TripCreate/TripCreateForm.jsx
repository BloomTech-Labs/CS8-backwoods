import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

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
              onChange={this.handleChange('numberOfWaypoints')}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="startDate">Start Date</InputLabel>
            <Input
              id="startDate"
              value={this.state.name}
              onChange={this.handleChange('startDate')}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <Input
              id="endDate"
              value={this.state.name}
              onChange={this.handleChange('endDate')}
            />
          </FormControl>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(TripCreate);
