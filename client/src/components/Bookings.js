import React, { Component } from 'react';
import AuthContext from '../context/auth-context'
import Loading from './Loading';


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
      // review and change to section
      <React.Fragment>
        {this.state.isLoading ? <Loading /> : (
          <ul>
            {this.state.bookings.map(booking => (
              <li key={booking._id}>
                {booking.event.title}: {' '}
                {new Date(booking.createdAt).toLocaleDateString()} by {booking.user.email}
              </li>
            ))}
          </ul>
        )}

      </React.Fragment>
    );
  }
}

export default BookingsComponent;