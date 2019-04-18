import React, { Component } from 'react';
import './css/Events.css';
import Modal from './Modal';
import Backdrop from './Backdrop';


class EventsComponent extends Component {
    state = {
        creating: false
    }

    startCreateEventHandler = () => {
        this.setState({ creating: true }) // condition to display or hide backdrop
    }
    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating &&
                    <Modal title="Add Booking" canCancel canConfirm>
                        <h1>Nice</h1>
                    </Modal>} {/* canCancel & canConfirm will be set as true */}
                <div className="events-wrapper">
                    <h1>Ready to book?</h1>
                    <button onClick={this.startCreateEventHandler}>Add Booking</button>
                </div>
            </React.Fragment>
        );
    }
}

export default EventsComponent;