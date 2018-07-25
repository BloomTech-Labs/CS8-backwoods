import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const NavBreadcrumb = (props) => {
  let currentLocation = window.location.pathname;

  return (
    <Paper className="navBreadcrumb">
      {/* <Link to={`/${props.user}`}>Home</Link> */}
      <Link to={`/${currentLocation}`}>Home</Link>
    </Paper>
  );
};

export default NavBreadcrumb;
