import React from 'react';
import MapContainer from './Map';
import WaypointList from './TripOpenWaypointList.jsx';
import TripOpenName from './TripOpenName';
import axios from 'axios';

class TripOpen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8000/getMarkers/${this.props.location.param1}`)
      .then(res => {
        console.log(res.data.marker)
        this.setState({ markers: res.data.marker })
      })
  }

  render() {
    return (
      <div>
        <TripOpenName
          tripName={this.props.location.param2}
        />
        <WaypointList
          startDate={this.props.location.param3}
          endDate={this.props.location.param4}
        />
        <MapContainer />
      </div>
    );
  };
}

export default TripOpen;
