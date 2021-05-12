import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>; // mark

const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 49.24,
      lng: -123.12
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="googleMap" style={{ height: '100vh', width: '30%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBZe2cBc8NJ5sUeToVP8Oq_Smyx5XR-gFU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={49.24}
            lng={-123.12}
            text="My Marker"
          /> 
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMap;