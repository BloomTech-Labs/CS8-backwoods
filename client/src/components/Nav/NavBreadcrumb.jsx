import React from 'react';
import Paper from '@material-ui/core/Paper';

const NavBreadcrumb = () => {
  let currentLocation = window.location.pathname;

  return (
    <Paper className="navBreadcrumb">
      <p>{currentLocation}</p>
    </Paper>
  );
};

export default NavBreadcrumb;
