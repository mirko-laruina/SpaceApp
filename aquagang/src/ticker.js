import React, {Component} from "react";
import Ticker from 'react-ticker'

const MoveStuffAround = () => (
    <Ticker>
        {({ index }) => (
            <div classname= "scorre">
                <h2>Pisa was drown!  #  </h2>
            </div>
        )}
    </Ticker>
)
 
export default MoveStuffAround 