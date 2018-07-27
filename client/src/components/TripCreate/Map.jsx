import React from 'react';
import { Map, Marker, Polygon, GoogleApiWrapper } from 'google-maps-react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps';
import Coordinates from './Coordinates.jsx';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  defaultProps = {
    center: {
      lat: 37.774929,
      lng: -122.419416
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

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
