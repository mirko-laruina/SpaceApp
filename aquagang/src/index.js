import React, {Component} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import SideBar from "./sidebar";
import MapContainer from './MapContainer.js';
import Cookies from 'universal-cookie'
const cookies = new Cookies()


class App extends Component {
    constructor(){
        super();
        this.state = {
            waterValue: 10,
        }
        this.waterHandler = this.waterHandler.bind(this)
    }

    waterHandler(evt, value){
        cookies.set('water', value);
        window.location.reload();
    }

    render(){
        return (
            <>
            <div id="App">
                <SideBar handler={this.waterHandler} className="sidebar" pageWrapId={"page-wrap"} outerContainerId={"App"} />

            <div id="page-wrap">
                <MapContainer water={this.state.waterValue}/>
            </div>
            </div>
            </>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

