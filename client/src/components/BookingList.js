
import React from 'react';

import './css/BookingList.css';


const bookingList = props => (
    <ul>
        {props.bookings.map(booking => {
            console.log(booking);
            return (
                <li key={booking._id} className="booked-item">
                    <div>
                        <h3>Booking Title:</h3>
                        <p>{booking.event.title}</p>
                    </div>
                    <div>
                        <h3>Booking Date:</h3>
                        <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h3>User:</h3>
                        <p>{booking.user.email}</p>
                    </div>
                    <div className="cancel-btn">
                        <button className="btn-warning"
                            onClick={props.onDelete.bind(this, booking._id)}
                        > Cancel
                        </button>
                        {/* props.onDelete runs method in bookings.js | bind refers to function when clicked | first argument 'this' because arrow function, 2nd argument because mapping through booking and using  _id property  */}
                    </div>
                </li>
            );
        })}
    </ul>
);

export default bookingList;