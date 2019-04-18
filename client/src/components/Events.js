import React, { Component } from 'react';
import './css/Events.css';


class EventsComponent extends Component {
    render() {
        return (
            <div className="events-wrapper">
                <h1>Ready to book?</h1>
                <button>Add Booking</button>
            </div>
        );
    }
}

export default EventsComponent;