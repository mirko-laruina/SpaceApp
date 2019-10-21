import React, {Component} from "react";
import { slide as Menu } from "react-burger-menu";
import './sidebar.css';
import Slider from '@material-ui/core/Slider';
import Cookies from 'universal-cookie';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import logo from './logo.png'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme1 = getMuiTheme({
  slider: {
    selectionColor: "red",
    trackSize: 20
  }
})

const cookies = new Cookies()


export default class Sidebar extends Component {

  constructor(){
    super();
    if(!cookies.get('severity')){
      cookies.set('severity', 1)
    }
    if(!cookies.get('year')){
      cookies.set('year', 2019)
    }
    this.state = {
      height: 0,
      year: 2019,
      severity: 5,
      popShow: true,
      valueSev: cookies.get('severity'),
      valueYear: cookies.get('year')
    }
    this.calcHeight = this.calcHeight.bind(this)
    this.yearHandler = this.yearHandler.bind(this)
    this.severityHandler = this.severityHandler.bind(this)
    this.changePopShow = this.changePopShow.bind(this)
  }

  yearHandler(evt){
    console.log(evt.target.value)
    this.setState({
      year: evt.target.value,
    })
    this.calcHeight();
  }

  severityHandler(evt){
    this.setState({
      severity: evt.target.value,
    })
    this.calcHeight()
  }

  calcHeight(evt, value){
    var newHeight
    this.setState({
      height: 10
    })
  }

  changePopShow(){
    this.setState({
      popShow: !this.state.popShow
    })
    this.props.popHandler();
  }

  render(){
    return (
      // Pass on our props
      <Menu right={true}>
        <img src={logo} className="logo"></img>
      <Typography id="discrete-slider-always" gutterBottom>
          Year
      </Typography>
       <MuiThemeProvider muiTheme={theme1}>
        <Slider
          className="slider"
          defaultValue={this.state.valueYear}
          aria-labelledby="discrete-slider-always"
          step={1}
          min={2019}
          max={2200}
          onChangeCommitted={(evt, value) => this.props.yearF(evt, value)}
          valueLabelDisplay="on"
        />
          </MuiThemeProvider>
        <Typography gutterBottom>
          Severity of prediction
        </Typography>
        <Slider
          className="slider"
          defaultValue={this.state.valueSev}
          aria-labelledby="discrete-slider-always"
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(evt, value) => this.props.sevF(evt, value)}
          valueLabelDisplay="on"
          />
        <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value="show" />}
            label="Show population"
            onClick = {this.changePopShow}
            checked = {this.state.popShow}
          />
        </FormGroup>
      </FormControl>
        </Menu>
    );
  }
};

/*
(3+0.2*anni)*anni

3.2*anni + 0.14*anni*anni
*/

