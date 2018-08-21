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
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 46.9282,
      lng: 121.5045
    };
  }

  static defaultProps = {
    center: {
      lat: 46.9282,
      lng: -121.5045
    },
    zoom: 12
  };

  render() {
    return (
      <div
        className="tripCreateMap"
        style={{
          opacity: this.props.mapOpacity
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={event => {
            if (this.props.MarkerCreated) {
              this.props.addMarker(event);
            }
          }}
        >
          <Marker lat={this.props.lat} lng={this.props.lng} />

          {this.props.newMarkersArr.map((markers, i) => {
            return (
              <Marker key={i} lat={markers.lat} lng={markers.lng}>
                {markers.lat}, {markers.lng}
              </Marker>
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;
