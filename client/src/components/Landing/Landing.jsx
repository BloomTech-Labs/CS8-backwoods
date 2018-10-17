import React from "react";
import BuyNow from "./BuyNow";
import "./Landing.css";
import logo from "./logo.svg";
import bullets from "./bullets.svg";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import SignInOut from "../SignInOut/SignInOut";

const Landing = props => {
  return (
    <React.Fragment>
      <SignInOut
        buttonColor={true}
        styleName="signInOutlanding"
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

      <div className="landingWrapper">
        <div className="header">
          <h1 className="backwoodsHeader">
            <img src={logo} className="logo" alt="logo" />
            Backwoods
          </h1>
          <h2 className="subtitleText">Wander safely.</h2>
        </div>
        <Paper className="paper">
          <ul className="wholeList">
            <li className="listItem">
              <img src={bullets} className="bullets" alt="bullet" /> Create
              trips by placing markers on the map
            </li>
            <li className="listItem">
              <img src={bullets} className="bullets" alt="bullet" /> Save your
              trips and share them with friends and family with your own
              personal URL so they know you're safe.
            </li>
            <li className="listItem">
              <img src={bullets} className="bullets" alt="bullet" /> Customize
              your own ETAs down to the minute for every marker you place
            </li>
            <li className="listItem">
              <img src={bullets} className="bullets" alt="bullet" /> Add trips
              to the archive when you're done and build up a log of all your
              travels
            </li>
            <li className="listItem">
              <img src={bullets} className="bullets" alt="bullet" />
              Check out our up coming hike on the{" "}
              <Link to="/aaron@backwood.app/trip/Crystal-Mountain-Loop">
                Crystal Mountain Loop
              </Link>{" "}
              in Washington State.
            </li>
          </ul>
          <h3>Subscribe for only $19.99/yr</h3>
          <BuyNow />
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default Landing;
