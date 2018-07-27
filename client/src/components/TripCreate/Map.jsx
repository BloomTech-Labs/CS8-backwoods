import React from 'react';
import GoogleMapReact from 'google-map-react';
import Coordinates from './Coordinates.jsx';

const Marker = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.73018235769022,
      lng: -122.33512938022614,
      text: 'frog'
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
    this.setState({ lat: event.lat, lng: event.lng });
  };

  render() {
    return (
      <div style={{ height: '400px', width: '600px', marginLeft: '30%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={event => {
            this.addMarker(event);
          }}
        >
          <Marker
            lat={this.state.lat}
            lng={this.state.lng}
            text={this.state.text}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;
// const style = {
//   width: '40%',
//   height: '60%'
// };
// const markers = [];
// export class MapContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.addMarker = this.addMarker.bind(this);
//   }
//
//   addMarker = location => {
//     let lat = location.latLng.lat();
//     let lng = location.latLng.lng();
//
//     const marker = new Marker({
//       position: { lat: lat, lng: lng },
//       map: Map
//     });
//     console.log(location);
//     markers.push(marker);
//     console.log(markers);
//   };
//
//   render() {
//     return (
//       <div className="tripCreateMap">
//         <Map
//           google={this.props.google}
//           style={style}
//           className={'map'}
//           zoom={11}
//           onClick={event => {
//             console.log('click');
//             console.log('line 36', event);
//             this.addMarker(event);
//           }}
//         />
//       </div>
//     );
//   }
// }
//
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw'
// })(MapContainer);
