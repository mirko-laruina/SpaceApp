import React from "react";
import { slide as Menu } from "react-burger-menu";
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default props => {

  

  return (

    // Pass on our props
    <Menu right={true} {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/popolazione">
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Population"
          labelPlacement="end"
        />
      </a>

      <a className="menu-item" href="/aree verdi">
      <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Green areas"
          labelPlacement="end"
        />
      </a>

      <a className="menu-item" href="/curve di livello">
      <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Levels"
          labelPlacement="end"
        />
      </a>

      <a className="menu-item" href="/time">
        Time
        <br/>
        <Slider
          defaultValue={30}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2019}
          max={2119}
        />
      </a>

      <a className="menu-item" href="/water">
        Water
        <br/>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={100}
        />
      </a>


      
    </Menu>
  );
};
