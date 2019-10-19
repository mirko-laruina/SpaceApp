import React, { Component } from "react";
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {

  constructor(){
    super();
    
    this.addPoint = this.addPoint.bind(this);
    this.updateMap = this.updateMap.bind(this);

    this.state = {
      costa: [
          {lat: -43.416667, lng:  11},
          {lat:  43.416667, lng:  11},
          {lat: -43.416667, lng: -11} 
          ],
    }
  }

    updateMap(){
        this.addPoint({lat: 43, lng:  11.416667});
    }

//Aggiunge un punto all'array costa in modo tale che sia messo tra i 2 punti piu vicini (Prototipo)
    addPoint(newPoint){
        let costaQ = []
        for(let i=0; i<this.state.costa.length; i++){
            let dist = this.state.costa[i].lat^2 + this.state.costa[i].lng^2; 
            costaQ.push(dist);
        }
        
        let distSum = [];
        for(let i=0; i<costaQ.length; i++){
            distSum.push(costaQ[i] + costaQ[(i+1)%costaQ.length]);
        }

        //Scegli l'indice di inserimento
        let index = Math.min(distSum);
        let newCosta = this.state.costa;
        newCosta.splice(index, 0, newPoint);
        this.setState({
          costa: newCosta,
        })
        console.log(newCosta);
    }

    render() {

        setTimeout(this.updateMap, 2000);

        return (
            <Map id="googleMap"
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 43.416667, lng: 11}}>
              <Polygon
                paths={this.state.costa}
                strokeColor="#000000"
                strokeOpacity={1}
                strokeWeight={2}
                fillColor="#aadaff"
                fillOpacity={2} >
              </Polygon>
            </Map>
        );
      }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD74jewz0A3giZ42WFsKFPfr5afNVbyDnM'
})(MapContainer);
