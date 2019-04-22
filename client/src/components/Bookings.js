import React, { Component } from 'react';

class BookingsComponent extends Component {
    state = {
        isLoading: false,
        bookings: []
    };

    componentDidMount() {

    }

    // Schema reference
    //
    // type RootQuery {
    //     events: [Event!]!
    //     bookings: [Booking!]!
    //     login(email: String!, password: String!): AuthData!
    // }

    // type Booking {
    //     _id: ID!
    //     event: Event!
    //     user: User!
    //     createdAt: String!
    //     updatedAt: String!
    // }

    fetchBookings = () => {
        this.setState({ isLoading: true });
        const requestBody = {
            query: `
                    query {
                        bookings {
                            _id
                            createdAt
                            event {
                                _id
                                title
                                date
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
                const bookings = resData.data.bookings;
                this.setState({ bookings: bookings, isLoading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    };

    render() {
        return (
            // review and change to section
            <ul>
                {this.state.bookings.map(booking =>
                    <li>
                        {booking.event.title}: {' '}
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </li>
                )}
            </ul>
        );
    }
}

export default BookingsComponent;