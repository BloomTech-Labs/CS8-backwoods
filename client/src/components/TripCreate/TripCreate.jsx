import API_URL from '../../API_URL';
import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import WaypointList from './WaypointList';
import slugify from 'slugify';
import axios from 'axios';
import './TripCreate.css';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import { format } from 'date-fns/esm';

// let date = new Date().toISOString().split('T')[0];


class TripCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      wayPoints: [],
      newMarkersArr: [],
      startDate: new Date(),
      endDate: new Date(),
      email: '',
      fireRedirect: false,
      markerName: '',
      mapOpacity: 0.4,
      lng: null,
      lat: null,
      tripId: '',
      MarkerCreated: false,
      saveLocationEnabled: true,
      disableRemoveMarker: true,
      expanded: null,
      tripSaveModal: false,
      modalFade: false,
      tripsfromUserName: [],

      eta: new Date(),
      time: new Date(),
      disableAddMarker: false,
      displayMarkerCard: false
    };
  }
  componentWillMount() {
    let tripsfromUserName = []
    this.props.tripsFromUser.forEach(trip => {
      tripsfromUserName.push(trip.tripName)
    })
    this.setState({tripsfromUserName: tripsfromUserName})
  }
  activateMap = () => {
    this.setState({
      lng: 0,
      lat: 0,
      mapOpacity: 1,
      MarkerCreated: true
    });
  };


////// NEW FUNCTIONS

  markerAddCard = () => {
    this.setState({
      disableAddMarker: true,
      displayMarkerCard: true
    })
  }

//////////////////////////////





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
      lat: null,
      lng: null
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, this._CheckMarkers());
  };

  handleNewWaypoint = (e) => {
    e.preventDefault()
    if(this.state.markerName === '' || this.state.lat === 0) {
      this.setState({
        tripSaveModal: true, modalFade: true
       
      })
    } else {

      let formatTime = format(new Date(this.state.time), 'HH:mm:ss')
      let newWayPoint = {
        markerName: this.state.markerName,
        eta: this.state.eta,
        time: formatTime,
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
          displayMarkerCard: false,
          markerName: '',
          eta: this.state.startDate
  
        },
        this.deactivateMap
      );
    }
  };

  handleSubmit = e => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    const { tripName, startDate, endDate, newMarkersArr } = this.state;
    const { email } = this.props;
    const slug = slugify(tripName);
    axios.post(`${API_URL}/createTrips`, { tripName, startDate, endDate, email, slug: slug }, { headers: { authorization: token } })
      .then(res => {
        this.props.getUsersAgain();
        this.setState({ fireRedirect: true }, this.props.setSaveTripTrue());
        const tripId = res.data.id;
        let markersArr = [...newMarkersArr];
        markersArr.forEach(item => {
          item.tripId = tripId;
        });
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
    // this.state.wayPoints.pop();
    // this.state.markers.pop();
    this.setState({

      disableAddMarker: false,
      eta: this.state.startDate,
      time: new Date(),
      markerName: '',
      // displayMarkerCard: true,
    }, this.markerCheck);
  };

  markerCheck = () => {
    if (this.state.newMarkersArr.length === 0) {
      return this.setState({ disableRemoveMarker: true })
    }
  }

  addMarker = event => {
    let lat = event.lat;
    let lng = event.lng;

    this.setState({ lat: lat, lng: lng }, this.disableSaveLocation());
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
  noMarkersModalOpenF = (e) => {
    e.preventDefault()
    if(this.state.newMarkersArr.length === 0) {
      this.setState({ tripSaveModal: true, modalFade: true})
    } else {
      this.handleSubmit()
    }
    
  }
  noMarkersModalFalseF =() => {
    this.setState({ tripSaveModal: false, modalFade: false})
  }
  handleTimeChange = (NewTime) => {
    this.setState({ time: NewTime });
  }
  handleDateChange = (name) => (date) => {
    let formatDate = format(new Date(date), 'YYYY/MM/D');
    this.setState({ [name]: formatDate });
  }

  render() {
    const isEnabled =
      this.state.tripName.length > 0 &&
      this.state.startDate.length > 0 &&
      this.state.endDate.length > 0;
    return (
      <div className="tripCreateWrapper">
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <TripCreateForm
          tripName={this.state.tripName}
          tripsfromUserName={this.state.tripsfromUserName}
          tripSaveModal={this.state.tripSaveModal}
          noMarkersModalOpenF={this.noMarkersModalOpenF}
          noMarkersModalFalseF={this.noMarkersModalFalseF}
          modalFade={this.state.modalFade}
          email={this.props.email}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          fireRedirect={this.state.fireRedirect}
          isEnabled={isEnabled}
          handleDateChange={this.handleDateChange}
          endDate={this.state.endDate}
          startDate={this.state.startDate}
        />
        </Slide>
        <div className="MapWaypointWrapper">
        <Zoom in={true}>
          <Map
            mapOpacity={this.state.mapOpacity}
            addMarker={this.addMarker}
            markers={this.state.markers}
            MarkerCreated={this.state.MarkerCreated}
            newMarkersArr={this.state.newMarkersArr}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          </Zoom>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <WaypointList
            noMarkersModalFalseF={this.noMarkersModalFalseF}
            noMarkersModalOpenF={this.noMarkersModalOpenF}
            tripSaveModal={this.state.tripSaveModal}
            modalFade={this.state.modalFade}
            handleNewWaypoint={this.handleNewWaypoint}


            disableAddMarker={this.state.disableAddMarker}
            displayMarkerCard={this.state.displayMarkerCard}
            markerAddCard={this.markerAddCard}
            lat={this.state.lat}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            newMarkersArr={this.state.newMarkersArr}

            time={this.state.time}
            eta={this.state.eta}
            handleChange={this.handleChange}
            addWaypoint={this.addWaypoint}
            wayPoints={this.state.wayPoints}
            activateMap={this.activateMap}
            removeMarker={this.removeMarker}
            // disableAddMarker={this.state.disableAddMarker}
            disableRemoveMarker={this.state.disableRemoveMarker}
            expanded={this.state.expanded}
            handleWayPointExpand={this.handleWayPointExpand}
            saveLocationEnabled={this.state.saveLocationEnabled}
            handleTimeChange={this.handleTimeChange}
            handleDateChange={this.handleDateChange}
          />
          </Slide>
        </div>
      </div>
    );
  }
}

export default TripCreate;
