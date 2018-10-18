import React from "react";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { TimePicker } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import MakerSaveModalWrapped from "./MakerSaveModal";
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const styles = {
  card: {
    minWidth: 275
  },
  button: {
    margin: theme.spacing.unit
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class WaypointCreateCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Collapse in={this.props.displayMarkerCard}>
          <Card className={classes.card}>
            <CardContent>
              <MuiThemeProvider theme={theme}>
                {this.props.children}
                <div className="waypointControlsWrapper">
                  <div className="waypointTextField">
                    <div className="datePicker">
                      <DatePicker
                        label="ETA"
                        showTodayButton
                        disablePast
                        initialFocusedDate={this.props.startDate}
                        minDate={this.props.startDate}
                        maxDate={this.props.endDate}
                        minDateMessage="ETA must be greater then trip start date"
                        maxDateMessage="ETA must be less than trip end date"
                        value={this.props.eta}
                        onChange={this.props.handleDateChange("eta")}
                        animateYearScrolling={false}
                        className="pickerCard"
                      />
                    </div>
                    <div className="timePicker">
                      <TimePicker
                        showTodayButton
                        todayLabel="now"
                        label="Time"
                        value={this.props.time}
                        onChange={this.props.handleTimeChange}
                        className="pickerCard"
                      />
                    </div>
                  </div>
                  <div className="waypointButtonContainer">
                    {this.props.lat === null ? (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={this.props.activateMap}
                        size="large"
                      >
                        Place Marker
                        <Icon>send</Icon>
                      </Button>
                    ) : (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={this.props.handleNewWaypoint}
                        size="large"
                      >
                        Save Location
                        <Icon>send</Icon>
                      </Button>
                    )}
                  </div>
                </div>
              </MuiThemeProvider>
            </CardContent>
          </Card>
        </Collapse>
        <MakerSaveModalWrapped
          noMarkersModalFalseF={this.props.noMarkersModalFalseF}
          noMarkersModalOpenF={this.props.noMarkersModalOpenF}
          noMarkerNameFalseF={this.props.noMarkerNameFalseF}
          markSaveModal={this.props.markSaveModal}
          markSaveFade={this.props.markSaveFade}
          handleNewWaypoint={this.props.handleNewWaypoint}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(WaypointCreateCard);
