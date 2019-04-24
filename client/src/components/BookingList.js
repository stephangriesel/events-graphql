
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
                        <button className="btn-warning">Cancel</button>
                    </div>
                </li>
            );
        })}
    </ul>
);

export default bookingList;