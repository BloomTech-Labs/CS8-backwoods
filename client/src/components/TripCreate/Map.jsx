import React from 'react';
import GoogleMapReact from 'google-map-react';
import Coordinates from './Coordinates.jsx';
const style = {
  height: '45px',
  width: '45px'
};
const Marker = ({ text }) => (
  <img style={style} src={'https://i.imgur.com/Lsk9eVr.png'} />
);
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.73018235769022,
      lng: -122.33512938022614,
      text: 'O',
      markers: [{ lat: 37.73018235769022, lng: -122.33512938022614 }] // initializing this array with values so that when you map through it you won't receive and error
    };
    this.addMarker = this.addMarker.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 37.774929,
      lng: -122.419416
    },
    zoom: 12
  };

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
      <div className="tripCreateMap" style={{ height: '400px', width: '30%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={event => {
            this.addMarker(event);
          }}
        >
          {this.state.markers.map((markers, i) => {
            return (
              <Marker
                key={i}
                lat={markers.lat}
                lng={markers.lng}
              >
                {markers.lat}, {markers.lng}
              </Marker>
            );
          })}
          {/* <Marker
            lat={this.state.lat}
            lng={this.state.lng}
            text={this.state.text}
          /> */}
        </GoogleMapReact>
        {this.state.markers.map((markers, i) => {
          return (
            <p key={i}>
              {markers.lat}, {markers.lng}
            </p>
          );
        })}
      </div>
    );
  }
}
export default Map;
