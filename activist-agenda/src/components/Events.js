import React, {useState, Component, PureComponent} from 'react';

import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl';
import EventInfo from './event-info';
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
    const {data, onClick} = this.props;
    //console.log("Pure Markers data:\n", data)
    
    return  data.map(
      entry =>  <Marker key={entry._id} 
                        longitude={entry.coordinates.longitude} 
                        latitude={entry.coordinates.latitude}
                >
                  <img src="/parade.svg" alt=""  width="30px" height="30px" onClick={() => onClick(entry)}/>
                </Marker>
      )
  }
}

class Popups extends PureComponent {
  render() {
    const {data} = this.props;
    //console.log("Pure Popups: ", data)
    return data.map(
      entry => 
        <Popup key={entry._id} 
            longitude={entry.coordinates.longitude} 
            latitude={entry.coordinates.latitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            dynamicPosition
            offsetTop={-20}
            >
              
        <EventInfo info={data}/>
        </Popup>
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
      popupInfo: null,
      events: []
    };
  }

  //On Start..
  componentDidMount() {
    this.goToPOI();
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

  goToPOI = () => {
    console.log("POI: ", this.props.focusPoint)
  }

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

  _onClickMarker = event => {
    //console.log("You clickeds on: ", event);
    this.setState({popupInfo: event}, this._renderPopup);
  }

  _renderPopup() {
    const {popupInfo} = this.state;
    console.log("popupInfo: ", popupInfo)
    return (
      
        <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({popupInfo: null})}
        >
          <div>{popupInfo.summary}</div>
        </Popup>
      
    )
  }


  render () {
    return (
        <div>
          <ReactMapGL
              {...this.state.viewPort}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={process.env.MAP_API || "pk.eyJ1Ijoidm94cG9wdWxpLTM1MiIsImEiOiJja2QxMjl0eHUwazFhMnJxdnlkZXdzbmN5In0.mDtjHH85xMmT7VbMhBBsEw"}
              onViewportChange= { viewPort => this.setState({viewPort})}
          >

            <div style={{position: 'absolute', right: '5vw'}}>
              <button onClick={this.goToUser}> My Location  </button>
              <button onClick={this.updateEvents}> Toggle Event Info  </button>
            </div>
            
            <Markers data={this.state.events} onClick={this._onClickMarker}/>
            {this._renderPopup}
          </ReactMapGL>
        </div>
    );
  }
}