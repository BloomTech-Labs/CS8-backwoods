import React from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  Polygon,
  GoogleApiWrapper
} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Coordinates from './Coordinates.jsx';

const style = {
  width: '40%',
  height: '60%'
};

export class MapContainer extends React.Component {
  render() {
    return (
      <div className="mapTest">
        <Map
          google={this.props.google}
          style={style}
          className={'map'}
          zoom={11}
        >
          <Marker position={Coordinates[0]} />
          <Marker position={Coordinates[1]} />
          <Marker position={Coordinates[2]} />
          <Polygon
            paths={Coordinates}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="rgba(0, 0, 0, 0)"
            fillOpacity={0.35}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw'
})(MapContainer);
