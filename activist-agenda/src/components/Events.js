import React, {useState, Component, PureComponent} from 'react';
import {Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { List } from 'material-ui';

import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl';

import '../App.css';
var calls = require('../serverCalls');

/* TODO:
* Make API environment variable
* Might run into issues with state calling order per ("Rules of Hooks"), ask Xaiver for explanation or read https://daveceddia.com/intro-to-hooks/#the-magic-of-hooks 
* Maybe custom hooks are the answer?, Maybe classes are... 
*/
// should retrieve events from server
// Path to follow:
// add Route in App.js => make contact throuhg serverCall.js => server processes data request 

class Markers extends PureComponent {
  render() {
    const {data} = this.props;
    console.log("Pure Markers data:\n", data)
    return  data.map(
      entry =>  <Marker key={entry._id} 
                        longitude={entry.coordinates.longitude} 
                        latitude={entry.coordinates.latitude}
                >
                  <img src="/parade.svg" alt=""  width="30px" height="30px"/>
                </Marker>
      )
  }
}

class Popups extends PureComponent {
  render() {
    const {data} = this.props;
    console.log("Pure Popups: ", data)
    return data.map(
      entry => 
        <Marker key={entry._id} 
            longitude={entry.coordinates.longitude} 
            latitude={entry.coordinates.latitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            dynamicPosition
            offsetTop={-20}
            >
              
        <div>{entry.summary}</div>
        </Marker>
    )
  }
}

export default class Event extends Component  {
  constructor(props)  {
    super(props);
  
    this.state = {
      viewPort: {
        width: "100vw",
        height: "100vh",
        longitude: -82.339592,
        latitude: 29.670388,
        zoom: 10,
      },
      userLocation: {
        lat: '',
        long: ''
      },
      showPopup: true,
      events: []
    };
  }

  //On Start..
  componentDidMount() {
    this.updateEvents();
    this.setUserLocation();
  }
  
  //Fetches event list from server
  updateEvents = () => {
    calls.getEvents().then(eventList => {
      //Set state of event array
      this.setState({
        events: eventList
      })
      console.log("Events fetched\n", eventList);
    })
  }

  //finding user location
  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      this.setState({
        userLocation: setUserLocation
      });
    });
  };

  goToUser = () => {
    const viewPort = {
      ...this.state.viewPort,
      latitude:  this.state.userLocation.lat,
      longitude:  this.state.userLocation.long,
      zoom: 12,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
    };
    this.setState({viewPort});
  }


  render () {
    return (
        <div>
          <ReactMapGL
              {...this.state.viewPort}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken="pk.eyJ1Ijoidm94cG9wdWxpLTM1MiIsImEiOiJja2QxMjl0eHUwazFhMnJxdnlkZXdzbmN5In0.mDtjHH85xMmT7VbMhBBsEw"
              onViewportChange= { viewPort => this.setState({viewPort})}
          >

            <div style={{position: 'absolute', right: '5vw'}}>
              
            </div>
            <button onClick={this.goToUser}> My Location  </button>
            <button onClick={this.updateEvents}> Toggle Event Info  </button>
            <Markers data={this.state.events}/>
            <Popups data={this.state.events}/>
          </ReactMapGL>
        </div>
    );
  }
}