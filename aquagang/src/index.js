import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import SideBar from "./sidebar";
import MapContainer from './MapContainer.js';
import { Map, GoogleApiWrapper } from 'google-maps-react';


function App() {
  return (
    <div id="App">
        <SideBar className="sidebar" pageWrapId={"page-wrap"} outerContainerId={"App"} />

      <div id="page-wrap">
        <MapContainer />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

