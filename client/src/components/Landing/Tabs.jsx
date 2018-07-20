import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SignInForm from './SignInForm.jsx';
import SignUpForm from './SignUpForm.jsx';

const styles = {
  root: {
    flexGrow: 1
  }
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>
        {this.state.value === 0 && (
          <TabContainer>
            <SignUpForm 
              handleChange={this.props.handleChange}
              handleSignUp={this.props.handleSignUp}
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              email={this.props.email}
              password={this.props.password}
              validatePassword={this.props.validatePassword}
              />
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer>
            <SignInForm
              handleChange={this.props.handleChange}
              handleSignIn={this.props.handleSignIn}
              email={this.props.email}
              password={this.props.password}
              />
          </TabContainer>
        )}
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
