import React from 'react';
import './css/EventList.css';
import EventItem from './EventItem';

const eventList = props => {
    const events = props.events.map(event => {
      return (
        <EventItem
          key={event._id}
          eventId={event._id}
          title={event.title}
          price={event.price}
          date={event.date}
          userId={props.authUserId}
          creatorId={event.creator._id}
          onDetail={props.onViewDetail}
        />
      );
    });

    /*
    Schema Reference:
    type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    
    type Event {
     _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
    */

    return (<ul className="event__list"> {/* render events */}
        {events}
    </ul>)
};

export default eventList;
