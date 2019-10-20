import React, {Component} from "react";
import Ticker from 'react-ticker';
import './ticker.css';

const MoveStuffAround = (props) => (

    <Ticker>
        
        {({ index }) => (
            <div className= "scorre">
                <h2>{props.frase} is drown!!!</h2>
            </div>
        )}
        
    </Ticker>
)
 
export default MoveStuffAround 
