import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import "./style.css";
import SideBar from "./sidebar.js";
import MapContainer from './MapContainer.js';
import Ticker from './ticker.js';
import { Map, GoogleApiWrapper } from 'google-maps-react';



function App() {

  var shuffle = require('shuffle-array'), citta = ['Pisa', 'Siena', 'Livorno', 'Viareggio'];

  return (
    <div id="App">
        <SideBar className="sidebar" pageWrapId={"page-wrap"} outerContainerId={"App"} />

        <Ticker className="ticker" pageWrapId={"page-wrap"} outerContainerId={"App"} frase={shuffle.pick(citta)}/>

      <div id="page-wrap">
        <MapContainer />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


