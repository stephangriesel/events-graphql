import React from 'react';
import './css/EventItem.css';


const eventItem = props => (
    <li key={props._id} className="event__list-item">
    {props.title}
    </li>
);

export default eventItem;