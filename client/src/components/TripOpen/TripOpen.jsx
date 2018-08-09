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
      tripName: '',
      noMarkers: false
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
        const tripId = res.data.trip.id
        return axios.get(`${API_URL}/getMarkers/${tripId}`) 
      })
      .then(res => {
        console.log(res)
        //420 other getOneTripBySlug
        //421 trip doesn't exist
        //422 "trip has no markers"
        //423 other getMarkers

        this.setState({ markers: res.data.marker})
        
      }).catch(error => {
        console.log(error);
        switch(error.response.status) {
          case 420:
            console.log('420 from getOneTripBySlug', error)
            break;
          case 421: 
            this.props.history.push(`/${this.props.match.params.user}/trip-not-found`);
            break;
          case 422:
            this.setState({noMarkers: true})
            break;
          case 423:
            console.log('423 from getMarks', error)
            break;
          default:
            console.log('default');
            break;
        }
      }

      )

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
