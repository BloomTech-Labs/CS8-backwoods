import API_URL from '../../API_URL';
import React from 'react';
import MapContainer from './Map';
import WaypointList from './TripOpenWaypointList.jsx';
import TripOpenName from './TripOpenName';
import axios from 'axios';
import './tripOpenStyling.css';
import { withRouter } from 'react-router-dom';

class TripOpen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      startDate: '',
      endDate: '',
      tripName: ''
    };
  }

  componentWillMount() {
    // console.log(this.props.location.param1)
    axios
      .get(`${API_URL}/${this.props.match.params.user}/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          startDate: res.data.trip.startDate,
          endDate: res.data.trip.endDate,
          tripName: res.data.trip.tripName
        })
      })
      .catch(err => {
        console.log(this.props)
        this.props.history.push(`/${this.props.match.params.user}/trip-not-found`)
      })

      // .get(`${API_URL}/getMarkers/${this.props.location.param1}`)
      // .then(res => {
      //   console.log(res.data.marker);
      //   this.setState({ markers: res.data.marker });
      // }).catch(err => {
      //   console.log(err);
      // });
  }

  render() {
    return (
      <div className="tripOpen">
        <TripOpenName tripName={this.state.tripName} />
        <div className="tripOpen-wrapper">
          <MapContainer
            markers={this.state.markers}

          />
          <WaypointList
            // key={this.state.markers.markerName}
            markers={this.state.markers}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TripOpen);
