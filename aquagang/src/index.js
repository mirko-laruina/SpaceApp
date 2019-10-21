import React, {Component} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import "./style.css";
import SideBar from "./sidebar.js";
import MapContainer from './MapContainer.js';
import Ticker from './ticker.js'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

var shuffle = require('shuffle-array')
var citta = ['Pisa', 'Siena', 'Livorno', 'Viareggio'];


class App extends Component {
    constructor(){
        super();
        this.state = {
            sevValue: 10,
            showPopMap: true,
            yearValue: 2019,
            metersVaue: 0
        }
        this.sevHandler = this.sevHandler.bind(this)
        this.yearHandler = this.yearHandler.bind(this)
        this.showPop = this.showPop.bind(this)
        this.updateMeters = this.updateMeters.bind(this)
    }

    updateMeters(){
        var coeff = 2.9+0.1*(this.state.sevValue-1)
        var anni = this.state.yearValue - 2019
        var meters = coeff*anni + (0.128 + 0.002*(this.state.sevValue))*anni*anni
        meters = meters/1000
        this.setState({
            metersValue: meters
        })
        cookies.set('water', meters);
        window.location.reload()
    }

    sevHandler(evt, value){
        this.setState({
            sevValue: value,
        })
        cookies.set('severity', value);
        this.updateMeters();
    }

    yearHandler(evt, value){
        this.setState({
            yearValue: value,
        })
        cookies.set('year', value)
        this.updateMeters();
    }

    showPop(){
        this.setState({
            showPopMap: !this.state.showPopMap,
        })
    }

    render(){
        return (
            <>
            <div id="App">
                <SideBar yearF={this.yearHandler}
                        popHandler={this.showPop}
                        sevF={this.sevHandler}
                        className="sidebar"
                        pageWrapId={"page-wrap"}
                        outerContainerId={"App"} />
                <Ticker className="ticker" pageWrapId={"page-wrap"} outerContainerId={"App"} frase={shuffle.pick(citta)}/>
            <div id="page-wrap">
                <MapContainer yearV={this.state.yearValue} showPop={this.state.showPopMap} meter={this.state.metersValue}/>
            </div>
            </div>
            </>
        );
    }

}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


