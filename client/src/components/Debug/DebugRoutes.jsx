import React from 'react';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom';

const DebugRoutes = () => {
  return (
    <Paper className="debug">
      <Link to="/"> [landing] </Link>
      <Link to="/trips/empty"> [empty trip list] </Link>
      <Link to="/trips/"> [trip list] </Link>
      {/* <Link to="/trips/id/1/"> [trip 1] </Link> */}
      {/* above link causes an error and crashes app, removed to prevent accidental clicks while debugging */}
      <Link to="/trips/create/"> [create trip] </Link>
      <Link to="/trips/settings/"> [account settings] </Link>
      <Link to="/trips/billing/"> [billing settings] </Link>
    </Paper>
  );
};

export default DebugRoutes;
