import API_URL from '../../API_URL';
import React from 'react';
import MapContainer from './Map';
import WaypointList from './TripOpenWaypointList.jsx';
import TripOpenName from './TripOpenName';
import axios from 'axios';
import './tripOpenStyling.css';
import { withRouter } from 'react-router-dom';
import { testTrip, testTripMarkers } from './testData';

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
    console.log('tripopen')
    console.log(testTrip[0])
    if(this.props.match.params.user === 'aaron@backwood.app' && this.props.match.params.slug === "Crystal-Mountain-Loop") {
      console.log(testTrip)
      this.setState({
        startDate: testTrip[0].startDate,
        endDate: testTrip[0].endDate,
        tripName: testTrip[0].tripName,
        markers: testTripMarkers
      })
    } else {
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
    }
    
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
