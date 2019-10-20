import React, { Component } from "react";
import { Map, GoogleApiWrapper, HeatMap, Polygon } from 'google-maps-react';
import myData from './altitudine.json';
import Cookies from 'universal-cookie'; 
import confiniToscana from "./toscanaConfini2.json";

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
      bordi: [],
      confini:[
        {lat:  50, lng:  0},
        {lat:  36, lng:  0},
        {lat:  36, lng:  19},
        {lat:  50, lng:  19},
        ],
    }

    this.updateData = this.updateData.bind(this)
  }

  updateData(threshold){
    var newData = myData;
    console.log("here")
    newData.forEach(element => {
      if(element.height === 0){
        element.weight = 0;
      } else if(element.height > threshold){
        element.weight = 0;
      } else {
        element.weight = (100-element.height);
      }
    });

    return newData
  }


    checkArea(mapProps, map){

      console.log(mapProps)
      /*let strictBounds = mapProps.google.maps.LatLngBounds(
        mapProps.google.maps.LatLng(42.448592,9.794551), 
        mapProps.google.maps.LatLng(44.403177 ,12.384934)
      );*/
      
      // We're out of bounds - Move the map back within the bounds
      var c = map.getCenter(),
          lng = c.lng(),
          lat = c.lat(),
          maxLat = 44.403177,
          minLat = 42.448592,
          maxLng = 12.384934,
          minLng = 9.794551;

      /*if (x > minX) x = minX;
      if (x < maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;*/
      console.log("lat:"+lat +" lng:"+lng);

      if(lat >= maxLat){
        console.log("lat: "+lat + " > " + maxLat);
        lat=maxLat;
      }else{
        if(lat < minLat){
          lat = minLat;
          console.log("lat: "+lat + " < " + minLat);
        }
      }

      if(lng >= maxLng){
        console.log("lng: "+lng + " > " + maxLng);
        lng=maxLng;
      }else{
        if(lng < minLng){
          console.log("lng: "+lng + " < " + minLng);
          lng = minLng;
        }
      }

      console.log("lat:"+lat +" lng:"+lng);

      map.setCenter({lat: lat, lng: lng});
    }


  componentDidUpdate(prevPops){
    if(this.props.water != prevPops.water){
      console.log(this.updateData(this.props.water))
      this.setState({
        data: this.updateData(this.props.water),
      })
    }
  }

  componentDidMount(){
    for(let i=0; i<4; i++){
      this.state.bordi.push(this.state.confini[i])
    }
    this.state.bordi.push(this.state.confini[0]);
    
    for(let j=0; j<17; j++){
      for(let i=0; i<confiniToscana[j].length; i++){
        this.state.bordi.push(confiniToscana[j][i])
      }
      this.state.bordi.push(confiniToscana[j][0]);
      this.state.bordi.push(confiniToscana[j][0]);
      this.state.bordi.push(this.state.confini[0]);

    }
    
    setTimeout(()=>{
      cookies.set("water", 10); console.log("adlknlanfa");
    }, 100)
  }

  render() {
    return (
        <Map id="googleMap"
          google={this.props.google}
          zoom={8}
          minZoom = {8.3}
          maxZoom = {12}
          onDragend = {this.checkArea}
          //bounds = {{lat:42.448592, lng:9.794551},{lat:44.403177 ,lng:12.384934}}
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
          </HeatMap>
          <Polygon
            paths= {this.state.bordi}
            strokeColor="#000000"
            strokeOpacity={0}
            strokeWeight={2}
            fillColor= "#b6cbdb"
            fillOpacity={0.7} >
          </Polygon>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD74jewz0A3giZ42WFsKFPfr5afNVbyDnM',
  libraries: ["visualization"]
})(MapContainer);
