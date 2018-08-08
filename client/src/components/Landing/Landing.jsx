import React from 'react';
import BuyNow from './BuyNow';
import './Landing.css';
import logo from './logo.svg';
import bullets from './bullets.svg';
import Paper from '@material-ui/core/Paper';

const Landing = () => {
  return (
    <div className="landingWrapper">
      <div className="header">
        <h1 className="backwoodsHeader">
          <img src={logo} className="logo" alt="logo" />Backwoods
        </h1>
        <h2 className="subtitleText">Wander safely.</h2>
      </div>
      <Paper className="paper">
        <ul className="wholeList">
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Create trips
            by placing markers on the map
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Save your
            trips and share them with friends and family with your own personal
            URL so they know you're safe
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Customize
            your own ETAs down to the minute for every marker you place
          </li>
          <li className="listItem">
            <img src={bullets} className="bullets" alt="bullet" /> Add trips to
            the archive when you're done and build up a log of all your travels
          </li>
        </ul>
        <h3>Subscribe for only $19.99/yr</h3>
        <BuyNow />
      </Paper>
    </div>
  );
};

export default Landing;
