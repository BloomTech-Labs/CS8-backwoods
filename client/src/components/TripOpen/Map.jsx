import React from 'react';
import GoogleMapReact from 'google-map-react';

const style = {
  height: '45px',
  width: '45px'
};

export class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 37.774929,
      lng: -122.419416
    },
    zoom: 12
  };


  render() {
    return (
      <div className="tripOpenMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
