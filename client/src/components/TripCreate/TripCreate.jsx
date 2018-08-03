import API_URL from '../../API_URL';
import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import WaypointList from './WaypointList';
import slugify from 'slugify';
import axios from 'axios';
import './TripCreate.css';

let date = new Date().toISOString().split('T')[0];
class TripCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      wayPoints: [],
      newMarkersArr: [],
      startDate: '',
      endDate: '',
      email: '',
      fireRedirect: false,
      markerName: '',
      eta: date,
      time: '',
      mapOpacity: 0.4,
      lng: null,
      lat: null,
      tripId: '',
      markers: [],
      MarkerCreated: false,
      disableAddMarker: false,
      saveLocationEnabled: true,
      disableRemoveMarker: true,
      expanded: null
    };
  }

  activateMap = () => {
    this.setState({
      mapOpacity: 1,
      MarkerCreated: true
    });
  };

  addWaypoint = () => {
    let newWayPoint = {
      markerName: 'Marker Name Here',
      eta: '',
      time: '',
      lng: '',
      lat: '',
      tripId: ''
    };
    this.setState(
      {
        wayPoints: [...this.state.wayPoints, newWayPoint],
        disableAddMarker: true,
        saveLocationEnabled: true,
      },
      this.activateMap
    );
  };

  deactivateMap = () => {
    this.setState({
      mapOpacity: 0.4,
      MarkerCreated: false,
      time: '',
      lat: null,
      lng: null
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, this._CheckMarkers());
  };

  handleNewWaypoint = () => {
    let newWayPoint = {
      markerName: this.state.markerName,
      eta: this.state.eta,
      time: this.state.time,
      lng: this.state.lng,
      lat: this.state.lat,
      tripId: ''
    };
    this.setState(
      {
        newMarkersArr: [...this.state.newMarkersArr, newWayPoint],
        disableAddMarker: false,
        disableRemoveMarker: false,
        saveLocationEnabled: true,
      },
      this.deactivateMap
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { tripName, startDate, endDate, newMarkersArr } = this.state;
    const { email } = this.props;
    const slug = slugify(tripName);
    axios.post(`${API_URL}/createTrips`, { tripName, startDate, endDate, email, slug: slug }, { headers: { authorization: token } })
      .then(res => {
        this.props.getUsersAgain();
        this.setState({ fireRedirect: true });
        const tripId = res.data.id;
        let markersArr = [...newMarkersArr];
        markersArr.forEach(item => {
          item.tripId = tripId;
        });
        console.log(markersArr);
        return axios.post(`${API_URL}/createMarker`, { markersArr }, { headers: { authorization: token } }
        );
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // removes marker after hitting save location
  removeMarker = () => {
    this.state.newMarkersArr.pop();
    this.state.wayPoints.pop();
    this.state.markers.pop();
    this.setState({
      disableAddMarker: false,
      eta: '',
      time: '',
      markerName: '',
    }, this.markerCheck);
  };

  markerCheck = () => {
    if (this.state.newMarkersArr.length === 0) {
      return this.setState({ disableRemoveMarker: true })
    }
  }

  addMarker = event => {
    // console.log('== CLICK ==');
    // console.log('X:', event.x);
    // console.log('Y:', event.y);
    // console.log('LAT:', event.lat);
    // console.log('LNG:', event.lng);
    let lat = event.lat;
    let lng = event.lng;

    const marker = {
      lat: lat,
      lng: lng
    };

    this.state.markers.push(marker);
    this.setState({ lat: lat, lng: lng }, this.disableSaveLocation());
    // console.log(this.state.markers);
  };

  handleWayPointExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  disableSaveLocation = () => {
    if (this.state.markerName.length > 0 && this.state.time.length > 0) {
      return this.setState({ saveLocationEnabled: false })
    } else {
      return this.setState({ saveLocationEnabled: true })
    }
  }

  _CheckMarkers = () => {
    if (this.state.lat === null && this.state.lng === null) {
      return this.setState({ saveLocationEnabled: true })
    } else {
      return this.setState({ saveLocationEnabled: false })
    }
  }


  render() {
    const isEnabled =
      this.state.tripName.length > 0 &&
      this.state.startDate.length > 0 &&
      this.state.endDate.length > 0;
    return (
      <div className="tripCreateWrapper">
        <TripCreateForm
          email={this.props.email}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          fireRedirect={this.state.fireRedirect}
          isEnabled={isEnabled}
        />
        <div className="MapWaypointWrapper">
          <Map
            mapOpacity={this.state.mapOpacity}
            addMarker={this.addMarker}
            markers={this.state.markers}
            MarkerCreated={this.state.MarkerCreated}
            newMarkersArr={this.state.newMarkersArr}
            lat={this.state.lat}
            lng={this.state.lng}
          />

          <WaypointList
            eta={this.state.eta}
            handleChange={this.handleChange}
            addWaypoint={this.addWaypoint}
            wayPoints={this.state.wayPoints}
            activateMap={this.activateMap}
            handleNewWaypoint={this.handleNewWaypoint}
            removeMarker={this.removeMarker}
            disableAddMarker={this.state.disableAddMarker}
            disableRemoveMarker={this.state.disableRemoveMarker}
            expanded={this.state.expanded}
            handleWayPointExpand={this.handleWayPointExpand}
            saveLocationEnabled={this.state.saveLocationEnabled}
          />
        </div>
      </div>
    );
  }
}

export default TripCreate;
