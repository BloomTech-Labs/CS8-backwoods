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
      lat: 37.73018235769022,
      lng: -122.33512938022614
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
    let lat = event.lat;
    let lng = event.lng;

    const marker = {
      lat: lat,
      lng: lng
    };

    this.setState({ lat: lat, lng: lng });
    this.props.newMarkersArr.push(marker);
  };

  render() {
    return (
      <div
        className="tripCreateMap"
        style={{
          // height: '500px',
          // width: '600px',
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
        {/* this shows the lat, lng below the map when clicking a marker */}
        {/* {this.props.markers.map((markers, i) => {
          return (
            <p key={i}>
              {markers.lat}, {markers.lng}
            </p>
          );
        })} */}
      </div>
    );
  }
}
export default Map;
