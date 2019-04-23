import React, { Component } from 'react';
import AuthContext from '../context/auth-context'
import Loading from './Loading';
import './css/Bookings.css';


class BookingsComponent extends Component {
  state = {
    isLoading: false,
    bookings: []
  };

  static contextType = AuthContext; // token,userid,login,logout

  componentDidMount() {
    this.fetchBookings();
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
    // debugger
    const requestBody = {
      query: `
              query {
                bookings {
                  _id
                 createdAt
                 user {
                   email
                 }
                 event {
                   _id
                   title
                   date
                 }
                }
              }
            `
    };
    // debugger

    // send request to backend
    fetch('http://localhost:8000/graphql', { // not using axios. fetch built into modern browsers
      method: 'POST',
      body: JSON.stringify(requestBody), // sending body in json format
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
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

      <React.Fragment>
        {this.state.isLoading ? <Loading /> : (
          // Bookings return: start
          <div className="booking-details">
            {this.state.bookings.map(booking => (
              <div key={booking._id} className="booked-item">

                <div className="bookingdetails__title">
                  <h3>Booking Title:</h3>
                  <p>{booking.event.title}</p>
                </div>

                <div className="bookingdetails__date">
                  <h3>Booking Date:</h3>
                  <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="bookingdetails__user">
                  <h3>User:</h3>
                  <p>{booking.user.email}</p>
                </div>
              </div>
            ))}
          </div>
          // Bookings return end
        )}
      </React.Fragment>
    );
  }
}

export default BookingsComponent;