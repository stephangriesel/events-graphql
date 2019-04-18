import React, { Component } from 'react';
import './css/Events.css';
import Modal from './Modal';
import Backdrop from './Auth';
import './css/Backdrop.css';


class EventsComponent extends Component {
    render() {
        return (
            <React.Fragment>
            <Backdrop />
            <Modal title="Add Booking" canCancel canConfirm><h1>Nice</h1></Modal> {/* canCancel & canConfirm will be set as true */}
            <div className="events-wrapper">
                <h1>Ready to book?</h1>
                <button>Add Booking</button>
            </div>
            </React.Fragment>
        );
    }
}

export default EventsComponent;