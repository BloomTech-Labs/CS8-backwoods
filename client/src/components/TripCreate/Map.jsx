import React from 'react';
import { Map, Marker, Polygon, GoogleApiWrapper } from 'google-maps-react';
import Coordinates from './Coordinates.jsx';

const style = {
  width: '40%',
  height: '60%'
};
const markers = [];
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker = location => {
    let lat = location.latLng.lat();
    let lng = location.latLng.lng();

    const marker = new Marker({
      position: { lat: lat, lng: lng },
      map: Map
    });
    console.log(location);
    markers.push(marker);
    console.log(markers);
  };

  render() {
    return (
      <div className="tripCreateMap">
        <Map
          google={this.props.google}
          style={style}
          className={'map'}
          zoom={11}
          onClick={event => {
            console.log('click');
            console.log('line 36', event);
            this.addMarker(event);
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw'
})(MapContainer);
