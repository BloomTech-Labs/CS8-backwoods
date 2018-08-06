import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginLeft: '6%',
    marginRight: '5%',
    textAlign: 'center'
  }
});
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const TripCreateForm = props => {
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Paper className="tripCreateForm">
            <MuiThemeProvider theme={theme}>
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
                className="spacingLeft spacingRight"
                value={props.startDate}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={props.handleChange('startDate')}
              />
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                className="spacingRight spacingRightBig "
                value={props.endDate}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={props.handleChange('endDate')}
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={!props.isEnabled}
              >
                Save Trip
                <Icon>send</Icon>
              </Button>
            </MuiThemeProvider>
          </Paper>
        </div>
      </form>
      {props.fireRedirect && <Redirect to={`/${props.email}`} />}
    </React.Fragment>
  );
};

export default withStyles(styles)(TripCreateForm);
