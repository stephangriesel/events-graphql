import React from 'react';
import './css/EventItem.css';


const eventItem = props => (
    <li key={props._id} className="event__list-item">
        <div class="item-details">
            <div class="detailed-item">
                <h1>{props.title}</h1>
                <h2>$1.00</h2>
            </div>
            <div class="detailed-item">
                <button>View Details</button>
            </div>
        </div>
    </li>
);

export default eventItem;