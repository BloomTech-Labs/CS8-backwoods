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
    console.log(event)
    console.log(value)
    this.setState({ value });
  };
  SignInandUp() {
    if (this.state.value === 0 && this.props.tabState === 0) {
      return (
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
      )
    } else if (this.state.value === 1 || this.props.tabState === 1) {
      console.log('value yo', this.state.value)
      console.log('from props you', this.props.tabState)
      return (
        <TabContainer>
          <SignInForm
            handleChange={this.props.handleChange}
            handleSignIn={this.props.handleSignIn}
            email={this.props.email}
            password={this.props.password}
          />
        </TabContainer>
      )
     
    }
    
  }

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
       
        {this.SignInandUp()}
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
