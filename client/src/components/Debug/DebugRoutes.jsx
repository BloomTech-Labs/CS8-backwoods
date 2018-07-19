import React from 'react';
import { Link } from 'react-router-dom';

const DebugRoutes = () => {
  return (
    <div>
      <h3 className="debug">
        <Link to="/"> [landing] </Link>
        <Link to="/trips/"> [trip list] </Link>
        <Link to="/trips/id/1/"> [trip 1] </Link>
        <Link to="/trips/create/"> [create trip] </Link>
        <Link to="/trips/settings/"> [account settings] </Link>
        <Link to="/trips/billing/"> [billing settings] </Link>
      </h3>
    </div>
  );
};

export default DebugRoutes;
