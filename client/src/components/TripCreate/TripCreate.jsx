import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import WaypointList from './WaypointList';
import slugify from 'slugify';
import axios from 'axios';

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
      eta: '',
      mapOpacity: 0.4,
      lng: '',
      lat: '',
      tripId: '',
      markers: [],
      MarkerCreated: false,
      disableAddMarker: false,
      disableRemoveMarker: true,
      expanded: null
    }
  }


  activateMap = () => {
    this.setState({
      mapOpacity: 1,
      MarkerCreated: true
    })
  }

  addWaypoint = () => {
    let newWayPoint = {
      markerName: 'Marker Name Here',
      eta: '',
      long: '',
      lat: '',
      tripId: ''
    }
    this.setState({
      wayPoints: [...this.state.wayPoints, newWayPoint],
      disableAddMarker: true
    }, this.activateMap)
  }


  deactivateMap = () => {
    this.setState({
      mapOpacity: 0.4,
      MarkerCreated: false
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleNewWaypoint = () => {
    let newWayPoint = {
      markerName: this.state.markerName,
      eta: this.state.eta,
      long: this.state.lng,
      lat: this.state.lat,
      tripId: '',
    }
    this.setState({
      newMarkersArr: [...this.state.newMarkersArr, newWayPoint],
      disableAddMarker: false,
      disableRemoveMarker: false,
    }, this.deactivateMap);
  }


  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const { tripName, startDate, endDate, newMarkersArr } = this.state;
    const { email } = this.props;
    const slug = slugify(tripName)
    // Deploy axios call
    // axios.post(`https://ancient-inlet-94126.herokuapp.com/createTrips`, { tripName, startDate, endDate, email }, { headers: { authorization: token } })
    // Test axios call
    axios.post(`http://localhost:8000/createTrips`, { tripName, startDate, endDate, email, slug: slug }, { headers: { authorization: token } })
      .then(res => {
        this.props.getUsersAgain();
        this.setState({ fireRedirect: true })
        const tripId = res.data.id;
        let markersArr = [...newMarkersArr]
        markersArr.forEach(item => {
          item.tripId = tripId
        });
        return axios.post(`http://localhost:8000/createMarker`, { markersArr }, { headers: { authorization: token } })
      }).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
  }

  // removes marker after hitting save location
  removeMarker = () => {
    this.state.newMarkersArr.pop();
    this.state.wayPoints.pop();
    this.state.markers.pop();
    this.setState({
      disableAddMarker: false,
      disableRemoveMarker: true,
    })
  };

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
    this.setState({ lat: lat, lng: lng });
    // console.log(this.state.markers);
  };

  handleWayPointExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    return (
      <div>
        <TripCreateForm
          email={this.props.email}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          fireRedirect={this.state.fireRedirect}
        />

        <Map
          mapOpacity={this.state.mapOpacity}
          addMarker={this.addMarker}
          markers={this.state.markers}
          MarkerCreated={this.state.MarkerCreated}
        />


        <WaypointList
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
        />
      </div>
    );
  }
};

export default TripCreate;
