import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SignInForm from './SignInForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import green from '@material-ui/core/colors/green';

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const styles = {
  root: {
    flexGrow: 1
  }
};

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};
const CenteredTabs = props => {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Tabs
          value={props.tabState}
          onChange={props.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>
        <TabContainer>
          {props.tabState === 0 && (
            <SignUpForm
              handleChange={props.handleChange}
              handleSignUp={props.handleSignUp}
              firstName={props.firstName}
              lastName={props.lastName}
              email={props.email}
              password={props.password}
              validatePassword={props.validatePassword}
            />
          )}
          {props.tabState === 1 && (
            <SignInForm
              handleChange={props.handleChange}
              handleSignIn={props.handleSignIn}
              email={props.email}
              password={props.password}
            />
          )}
        </TabContainer>
      </Paper>
    </MuiThemeProvider>
  );
};

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
