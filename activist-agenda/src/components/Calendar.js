import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, {Component} from 'react';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export default class EventCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            view : 'month',
            events: []
        };
    }

    //OnStart
    componentDidMount() {
        this.translateEvents(entries);// set initial
    }
    //For retrieving any array with matching value types, and translating it into new keys. Will need geocoding for and date parsing 
    translateEvents = (props) => {

        let fixed = entries.map( entry =>
                    ({  
                        title:  entry.summary,
                        start:  entry.date,
                        end:    entry.date,
                        allDay: false,

                        coordinates: entry.coordinates
                    })
                );
        this.setState({events:fixed});
    }

    onView = (props) =>  {
        this.setState.view(props);
    }


    render()    {
        return (
            <div className="CalBox">
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView={Views.month}
                    events={this.state.events}
                    style={{height: '400px' }}
                    view={this.state.view}
                    onView={event => this.setState({view : event})}//this.setState.view
                    selectable='true'
                    onSelectEvent={event => console.log(event)}
                    popup
                />
            </div>
        );
    }

}

var entries = [
    {
        "summary": "March on City Hall",
        "address": "200 E University Ave, Gainesville, FL 32601",
        "coordinates": {
            "latitude": 29.652639,
            "longitude": -82.323189
        },
        "date": "2020-08-01",
        "description": "I can't just sit here, it's time for action!"
    },
    {
        "summary": "Take the power back",
        "address": "301 SE 4th Ave, Gainesville, FL 32601",
        "coordinates": {
            "latitude": 29.647869,
            "longitude": -82.321953
        },
        "date": "2020-08-02",
        "description": "I will restore the working man to his rightful glory. I will dismantle this oppressive establishment board by board!"
    },
    {
        "summary": "Get more supplies",
        "address": "3101 Clark Butler Blvd, Gainesville, FL 32608",
        "coordinates": {
            "latitude": 29.625490,
            "longitude": -82.381410
        },
        "date": "2020-08-03",
        "description": "I will saw the tables of tyranny in half. Gnaw at the ankles of big business!"
    }
]