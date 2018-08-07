import API_URL from '../../API_URL';
import React from 'react';
import MapContainer from './Map';
import WaypointList from './TripOpenWaypointList.jsx';
import TripOpenName from './TripOpenName';
import axios from 'axios';
import './tripOpenStyling.css';
class TripOpen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
  }

  componentWillMount() {
    axios
      .get(`${API_URL}/getMarkers/${this.props.location.param1}`)
      .then(res => {
        console.log(res.data.marker);
        this.setState({ markers: res.data.marker });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="tripOpen">
        <TripOpenName tripName={this.props.location.param2} />
        <div className="tripOpen-wrapper">
          <MapContainer
            markers={this.state.markers}
            key={this.state.markers.markerName}
          />
          <WaypointList
            key={this.state.markers.markerName}
            markers={this.state.markers}
            startDate={this.props.location.param3}
            endDate={this.props.location.param4}
          />
        </div>
      </div>
    );
  }
}

export default TripOpen;
