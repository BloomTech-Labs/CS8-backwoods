import React from 'react';
import GoogleMapReact from 'google-map-react';

const style = {
  height: '40px',
  width: '40px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
};
const Marker = ({ text }) => (
  <img style={style} src={'https://i.imgur.com/Lsk9eVr.png'} alt="" />
);
export class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 46.9282,
      lng: -121.5045
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
          {this.props.markers.map((marks, i) => {
            return (
              <Marker key={i} lat={marks.lat} lng={marks.lng}>
                {marks.lat}, {marks.lng}
              </Marker>
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
