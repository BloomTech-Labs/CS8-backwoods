import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import ExpansionPanels from './ExpansionPanels.jsx';

const TripCreate = () => {
  return (
    <div>
      <TripCreateForm />
      <Map />
      <ExpansionPanels />
    </div>
  );
};

export default TripCreate;
