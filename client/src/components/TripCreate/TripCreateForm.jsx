import React from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import NoMarkersModalWrapped from './TripSaveModal'
import { DatePicker } from 'material-ui-pickers';


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
class TripCreateForm extends React.Component{
  componentDidMount() {
    ValidatorForm.addValidationRule('tripExists', value => {
      if (this.props.tripsfromUserName.length === 0){
        return true
      }
      for(let i = 0; i < this.props.tripsfromUserName.length; i++) {
        if(value.toLowerCase() !== this.props.tripsfromUserName[i].toLowerCase()) {
          return true
        }
        return false
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <ValidatorForm autoComplete='off' onSubmit={this.props.noMarkersModalOpenF}>
          <div>
            <Paper className="tripCreateForm">
              <MuiThemeProvider theme={theme}>
                  <TextValidator
                    autoComplete='off'
                    className="textVal"
                    validators={['tripExists']}
                    id="tripName"
                    name="tripName"
                    label="Trip Name"
                    type="text"
                    errorMessages={['trip name already exists']}
                    value={this.props.tripName}
                    onChange={this.props.handleChange('tripName')}
                  />
                  <div className="picker">
                    <DatePicker
                      label="Start Date"
                      disablePast
                      showTodayButton
                      // maxDate={this.props.endDate}
                      // maxDateMessage="Date must be less that trip end date"
                      value={this.props.startDate}
                      onChange={this.props.handleDateChange('startDate')}
                      animateYearScrolling={true}
                      />
                    </div>
                    <div className="picker">
                    <DatePicker
                      label="End Date"
                      disablePast
                      showTodayButton
                      minDate={this.props.startDate}
                      minDateMessage="Date must be geater than trip start date"
                      value={this.props.endDate}
                      onChange={this.props.handleDateChange('endDate')}
                      animateYearScrolling={true}
                      />
                    </div>
              
                <Button
                  id="saveTripButton"
                  variant="outlined"
                  type="submit"
                  color="primary"
                  size="large"
                  disabled={!this.props.isEnabled}
                >
                  Save Trip
                  <Icon>send</Icon>
                </Button>
              </MuiThemeProvider>
            </Paper>
            <NoMarkersModalWrapped
              noMarkersModalFalseF={this.props.noMarkersModalFalseF}
              noMarkersModalOpenF={this.props.noMarkersModalOpenF}
              tripSaveModal={this.props.tripSaveModal}
              modalFade={this.props.modalFade}
              handleSubmit={this.props.handleSubmit}
              />
          </div>
        </ValidatorForm>
        {this.props.fireRedirect && <Redirect to={`/${this.props.email}`} />}
      </React.Fragment>
    );
  }
  
};

export default withStyles(styles)(TripCreateForm);
