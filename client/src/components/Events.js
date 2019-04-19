import React, { Component } from 'react';
import './css/Events.css';
import Modal from './Modal';
import Backdrop from './Backdrop';


class EventsComponent extends Component {
    state = {
        creating: false
    };

    constructor(props) { // binding was also option
        super(props);
        this.titleElementRef = React.createRef();
        this.priceElementRef = React.createRef();
        this.dateElementRef = React.createRef();
        this.descriptionElementRef = React.createRef();
    }

    startCreateEventHandler = () => {
        this.setState({ creating: true }) // condition to display or hide backdrop/modal
    };

    modalConfirmHandler = () => {
        this.setState({ creating: false });
        const title = this.titleElementRef.current.value; // get values entered on frontend
        const price = +this.priceElementRef.current.value; // the '+' in front of this converts string to number
        const date = this.dateElementRef.current.value;
        const description = this.descriptionElementRef.current.value;

        if (
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0 
        ) {
            return;
        }

        const event = {title:title,price:price,date:date,description:description};
        console.log(event); 

        
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
                                <input type="text" id="title" placeholder="Your booking title" ref={this.titleElementRef}></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="price">Price</label> */}
                                <input type="number" id="price" placeholder="Set your price" ref={this.priceElementRef}></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="date">Date</label> */}
                                <input type="datetime-local" id="date" placeholder="Choose your date" ref={this.dateElementRef}></input>
                            </div>
                            <div className="form-wrapper__events">
                                {/* <label htmlFor="description">Description</label> */}
                                <textarea id="description" rows="10" ref={this.descriptionElementRef}/>
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