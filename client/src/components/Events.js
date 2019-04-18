import React, { Component } from 'react';
import './css/Events.css';
import Modal from './Modal';
import Backdrop from './Backdrop';


class EventsComponent extends Component {
    state = {
        creating: false
    };

    startCreateEventHandler = () => {
        this.setState({ creating: true }) // condition to display or hide backdrop/modal
    };

    modalConfirmHandler = () => {
        this.setState({ creating: false });
    };
    modalCancelHandler = () => {
        this.setState({ creating: false });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating &&
                    <Modal title="Add Booking"
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalConfirmHandler}
                    >
                        <form> {/* compare to schema*/}
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="title">What kind of booking ye majesty?</label> */}
                                <input type="text" id="title" placeholder="Booking title ye majesty?"></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="price">Price</label> */}
                                <input type="number" id="price" placeholder="Set your price"></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="date">Date</label> */}
                                <input type="date" id="date" placeholder="Choose your date"></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="description">Description</label> */}
                                <textarea id="description" rows="2" />
                                </div>
                        </form>
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