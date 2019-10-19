import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {

    render() {
        return (
            <Map id="googleMap"
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD74jewz0A3giZ42WFsKFPfr5afNVbyDnM'
})(MapContainer);
