import React from 'react';
import './404.css';
import Typography from '@material-ui/core/Typography';
import SignInOut from '../SignInOut/SignInOut';

const UserNotFound404 = (props) => (
  <div className="Wrapper404">
  <SignInOut
        buttonColor={true}
        styleName='signInOutlanding'
        buttonVariant="contained"
        handleTabChange={props.handleTabChange}
        handleLogOut={props.handleLogOut}
        tabState={props.tabState}
        handleChange={props.handleChange}
        handleSignUp={props.handleSignUp}
        handleSignIn={props.handleSignIn}
        firstName={props.firstName}
        lastName={props.lastName}
        email={props.email}
        password={props.password}
        validatePassword={props.validatePassword}
        isLoggedIn={props.isLoggedIn}
        handleClose={props.handleClose}
        handleOpen={props.handleOpen}
        open={props.open}
      />
    <div class="hero-image-404">
      <div className="hero-text">
        <Typography 
          variant="display4"
          color="inherit">
          Sorry
        </Typography>
        <Typography 
          variant="display2"
          color="inherit">
          That user was not found
      </Typography>
      </div>
    </div>
  </div>
)

export default UserNotFound404;