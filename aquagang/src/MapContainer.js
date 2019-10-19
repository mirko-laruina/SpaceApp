import React, { Component } from "react";
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';
import confiniToscana from "./toscanaConfini.json";

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {

  constructor(){
    super();
    
    this.addPoint = this.addPoint.bind(this);
    this.checkArea = this.checkArea.bind(this);

    this.state = {
      costa: [
          {lat:  43.416667, lng:  11},
          {lat:  43.416667, lng:  11.5},
          {lat:  43, lng:  11.5} 
          ],
      confini:[
          {lat:  41, lng:  8},
          {lat:  45, lng:  8},
          {lat:  45, lng:  15},
          {lat:  41, lng:  15},
        ],
      bordi:[]
      }
    }


    componentDidMount(){
      this.addPoint({lat: 42, lng: 11});

      //this.state.confini.forEach(e => {
      //  this.state.bordi.push(e)
      //});
      for(let i=0; i<1; i++){
        this.state.bordi.push(this.state.confini[i])
      }
      //this.state.bordi.push(this.state.confini[0]);

      confiniToscana[16].forEach(e => {
        this.state.bordi.push(e)
      });
      this.state.bordi.push(confiniToscana[16][0]);
    }

    //Aggiunge un punto all'array costa in modo tale che sia messo tra i 2 punti piu vicini (Prototipo)
    addPoint(newPoint){
        let costaQ = []
        for(let i=0; i<this.state.costa.length; i++){
          let dist = Math.pow(this.state.costa[i].lat, 2) + Math.pow(this.state.costa[i].lng, 2); 
          costaQ.push(dist);
        }
        
        let distSum = [];
        for(let i=0; i<costaQ.length; i++){
            distSum.push(costaQ[i] + costaQ[(i+1)%costaQ.length]);
        }

        //Scegli l'indice di inserimento
        let index = (Math.min(...distSum) - 1) % this.state.costa.length;
        let newCosta = this.state.costa;
        newCosta.splice(index, 0, newPoint);
        this.setState({
          costa: newCosta,
        })
    }

    checkArea(mapProps, map){

      //console.log(map.center)
      // Bounds for North America
      let strictBounds = new this.props.google.maps.LatLngBounds(
        new this.props.google.maps.LatLng(42.448592,9.794551), 
        new this.props.google.maps.LatLng(44.403177 ,12.384934)
      );

      if (strictBounds.contains(map.getCenter())) return;

      // We're out of bounds - Move the map back within the bounds
      var c = map.getCenter(),
          x = c.lng(),
          y = c.lat(),
          maxX = strictBounds.getNorthEast().lng(),
          maxY = strictBounds.getNorthEast().lat(),
          minX = strictBounds.getSouthWest().lng(),
          minY = strictBounds.getSouthWest().lat();

      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;

      map.setCenter(new this.props.google.maps.LatLng(y, x));

    }

    render() {
        return (
            <Map id="googleMap"
              google={this.props.google}
              onDragend={this.checkArea}
              zoom={8.5}
              //minZoom={9}
              maxZoom={14}
              bounds = {this.state.center}
              style={mapStyles}
              initialCenter={{ lat: 43.416667, lng: 11}}>
              <Polygon
                paths= {this.state.bordi}//{this.state.costa}
                strokeColor="#000000"
                strokeOpacity={1}
                strokeWeight={2}
                fillColor= "#000000"//"#aadaff"
                fillOpacity={2} >
              </Polygon>
            </Map>
        );
      }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD74jewz0A3giZ42WFsKFPfr5afNVbyDnM'
})(MapContainer);
