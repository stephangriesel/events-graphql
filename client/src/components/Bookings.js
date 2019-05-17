import React, { Component } from 'react';
import AuthContext from '../context/auth-context'
import Loading from './Loading';
import './css/Bookings.css';
import BookingList from '../components/BookingList';


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

  // Schema reference:

//   type RootMutation {
//     createEvent(eventInput: EventInput): Event
//     createUser(userInput: UserInput): User
//     bookEvent(eventId: ID!): Booking!
//     cancelBooking(bookingId: ID!): Event! << endpoint
// }

  deleteBookingHandler = bookingId => { // props.onDelete.bind refers to this
    this.setState({ isLoading: true });
    // debugger
    const requestBody = {
      query: `
              mutation CancelBooking($id: ID!) {
                cancelBooking(bookingId: $id){
                  _id
                 title
                }
              }
            `,
            variables: {
              id: bookingId
            }
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
        const bookings =
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (

      <React.Fragment>
        {this.state.isLoading ? <Loading /> : (
          // Bookings return: start
          <BookingList
            bookings={this.state.bookings}
            onDelete={this.deleteBookingHandler} // props.onDelete.bind refers to this
          />
          // Bookings return end
        )}
      </React.Fragment>
    );
  }
}

export default BookingsComponent;