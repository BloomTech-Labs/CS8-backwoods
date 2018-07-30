import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import ExpansionPanels from './ExpansionPanels.jsx';

const TripCreate = props => {
  return (
    <div>
      <TripCreateForm email={props.email} getUsersAgain={props.getUsersAgain} />
      <div className="mapAndExpPanels">
        <Map />
        <ExpansionPanels />
      </div>
    </div>
  );
};

export default TripCreate;
