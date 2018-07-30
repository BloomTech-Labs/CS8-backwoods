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
      numberOfWayPoints: 0,
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
      markers: [{ lat: 37.73018235769022, lng: -122.33512938022614 }],
      MarkerCreated: false
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
      markerName: 'bla',
      eta: '',
      long: '',
      lat: '',
      tripId: ''
    }
    this.setState({ 
      wayPoints: [...this.state.wayPoints, newWayPoint],
    }, this.activateMap)
  }
  deactivateMap = () => {
    console.log("Was I called at all?")
    this.setState({
      mapOpacity: 0.4,
      MarkerCreated: false
    })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleWaypointChange = (e, wayPointKey) => {
    console.log(e.target.value)
    console.log(wayPointKey)
    let updatedWayPoint = {
      markerName: e.target.value,
      eta: '',
      long: '',
      lat: '',
      tripId: ''
    }
    this.setState({
      wayPoints: [...this.state.wayPoints, updatedWayPoint]
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const { tripName, startDate, endDate, tripId, lng, lat, eta, markerName } = this.state;
    const { email } = this.props;
    const slug = slugify(tripName)
    // Deploy axios call
    // axios.post(`https://ancient-inlet-94126.herokuapp.com/createTrips`, { tripName, startDate, endDate, email }, { headers: { authorization: token } })
    // Test axios call
    axios.post(`http://localhost:8000/createTrips`, { tripName, startDate, endDate, email, slug: slug }, { headers: { authorization: token } })
      .then(res => {
        console.log("This is the id you need",res)
        this.props.getUsersAgain();
        this.setState({ fireRedirect: true, tripId: res.data.id })

        return axios.post(`http://localhost:8000/createMarker`, {tripId: res.data.id, markerName, eta, long: lng, lat }, { headers: { authorization: token } })
      }).then(res => {
          console.log(res);
      }).catch(error => {
        console.log(error);
      })
    }

  addMarker = event => {
    console.log('== CLICK ==');
    console.log('X:', event.x);
    console.log('Y:', event.y);
    console.log('LAT:', event.lat);
    console.log('LNG:', event.lng);
    let lat = event.lat;
    let lng = event.lng;

    const marker = {
      lat: lat,
      lng: lng
    };

    this.state.markers.push(marker);
    this.setState({ lat: lat, lng: lng });
    console.log(this.state.markers);
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
          deactivateMap={this.deactivateMap}
        />
      </div>
    );
  }
};

export default TripCreate;
