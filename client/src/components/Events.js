import React, { Component } from 'react';
import './css/Events.css';
import Modal from './Modal';
import Backdrop from './Backdrop';
import AuthContext from '../context/auth-context';
import EventList from './EventList';

class EventsComponent extends Component {
    state = {
        creating: false,
        events: []
    };

    static contextType = AuthContext; // token,userid,login,logout

    constructor(props) { // binding was also option
        super(props);
        this.titleElementRef = React.createRef();
        this.priceElementRef = React.createRef();
        this.dateElementRef = React.createRef();
        this.descriptionElementRef = React.createRef();
    }

    // Lifecycle hook
    componentDidMount() {
        this.fetchBookings();
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

        const event = { title: title, price: price, date: date, description: description };
        console.log(event);

        // Same logic as in Auth.js: START

        // Reference to schema:

        // input EventInput {
        //     title: String!
        //     description: String!
        //     price: Float!
        //     date: String!
        // }


        // type Event {
        //     _id: ID!
        //     title: String!
        //     description: String!
        //     price: Float!
        //     date: String!
        //     creator: User!
        // }

        const requestBody = {
            query: `
                    mutation {
                        createEvent(eventInput: 
                        {
                            title:"${title}", 
                            description:"${description}",
                            price:${price},
                            date:"${date}",
                        
                        }) {
                            _id
                            title
                            description
                            date
                            price
                        }
                    }
                `
        };

        const token = this.context.token;

        // send request to backend
        fetch('http://localhost:8000/graphql', { // not using axios. fetch built into modern browsers
            method: 'POST',
            body: JSON.stringify(requestBody), // sending body in json format
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Please login and try again. Failed!');
            }
            return res.json();
        })

        // For reference, using createEvent mutation to push event:
        // createEvent(eventInput: 
        //     {
        //         title:"${title}", 
        //         description:"${description}",
        //         price:${price},
        //         date:"${date}",
            
        //     }) {
        //         _id
        //         title
        //         description
        //         date
        //         price
        //     }
        
            .then(resData => { // Token for logging in
                this.setState(prevState => {
                    const updatedEvents = [...prevState.events];
                    updatedEvents.push({
                        _id: resData.data.createEvent._id,
                        title: resData.data.createEvent.title,
                        description: resData.data.createEvent.description,
                        date: resData.data.createEvent.date,
                        price: resData.data.createEvent.price,
                        creator: {
                            id: this.context.userId
                        }
                    });
            });
    })
            .catch(err => {
        console.log(err); // show error messages, not status codes, more like network issues
            });
        // Same logic as in Auth.js: END

    };
modalCancelHandler = () => {
    this.setState({ creating: false });
};

fetchBookings() {
    const requestBody = {
        query: `
                    query {
                        events {
                            _id
                            title
                            description
                            date
                            price
                            creator {
                                _id
                                email
                            }
                        }
                    }
                `
    };

    // send request to backend
    fetch('http://localhost:8000/graphql', { // not using axios. fetch built into modern browsers
        method: 'POST',
        body: JSON.stringify(requestBody), // sending body in json format
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Please login and try again. Failed!');
        }
        return res.json();
    })
        .then(resData => {
            const events = resData.data.events;
            this.setState({ events: events });
        })
        .catch(err => {
            console.log(err);
        });
}

render() {

    return (
        <React.Fragment>
            {this.state.creating && <Backdrop />}
            {this.state.creating && (
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
                            <textarea id="description" rows="10" ref={this.descriptionElementRef} />
                        </div>
                    </form>
                </Modal>
            )} {/* canCancel & canConfirm will be set as true */}
            {this.context.token && (
                <div className="events-wrapper">
                    <h1>Ready to book?</h1>
                    <button onClick={this.startCreateEventHandler}>Add Booking</button>
                </div>
            )}
            <EventList events={this.state.events} authUserId={this.context.userId} /> {/* pass props from component, events passed & userid passed */}
        </React.Fragment>
    );
}
}

export default EventsComponent;