import React, { Component } from "react";
import { Map, GoogleApiWrapper, HeatMap, Polyline } from 'google-maps-react';
import myData from './altitudine.json';
import {Button} from 'react-bootstrap'
import confiniToscana from "./toscanaConfini.json";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const mapStyles = {
  width: '100%',
  height: '100%',
};

var newData

class MapContainer extends Component {

  constructor(){
    super();
    newData = this.updateData(cookies.get('water'))

    this.state = {
      gradient: [
        'rgba(170, 218, 255, 0)',
        'rgba(170, 218, 255, 0)',
        'rgba(170, 218, 255, 0)',
        'rgba(170, 218, 255, 0)',
        'rgba(170, 218, 255, 0)',
        'rgba(170, 218, 255, 1)',
        'rgba(170, 218, 255, 1)',
        'rgba(170, 218, 255, 1)',
        'rgba(170, 218, 255, 1)',
        'rgba(170, 218, 255, 1)',
        'rgba(170, 218, 255, 1)',
      ],
      data: newData,
      treshold: 1
    }

    this.updateData = this.updateData.bind(this)
  }

  updateData(threshold){
    var newData = myData;
    console.log("here")
    newData.forEach(element => {
      if(element.height == 0){
        element.weight = 0;
      } else if(element.height > threshold){
        element.weight = 0;
      } else {
        element.weight = (100-element.height);
      }
    });

    return newData
  }

  componentDidUpdate(prevPops){
    if(this.props.water != prevPops.water){
      console.log(this.updateData(this.props.water))
      this.setState({
        data: this.updateData(this.props.water),
      })
    }
  }

  render() {
    return (
        <Map id="googleMap"
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 43.416667, lng: 11}}>
          <HeatMap
            positions ={this.state.data}
            gradient={this.state.gradient}
            opacity={1}
            dissipating={false}
            radius={0.07}
            opacity={0.7}
          >
          <Polyline path={confiniToscana}
            options={{ 
              strokeColor: '#fff',
              strokeOpacity: 1,
              strokeWeight: 2,}}/>
          </HeatMap>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD74jewz0A3giZ42WFsKFPfr5afNVbyDnM',
  libraries: ["visualization"]
})(MapContainer);
