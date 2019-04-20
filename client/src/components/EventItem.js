import React from 'react';
import './css/EventItem.css';

const eventItem = props => (
    <li key={props._id} className="event__list-item">
        <div className="item-details">
            <div className="detailed-item">
                <h1>{props.title}</h1>
                <h2>€{props.price}</h2>
                <p className="event__date">Date Added: {new Date(props.date).toLocaleDateString('gb-EN')}</p> {/* Review date format */}
            </div>
            <div className="detailed-item">
                {props.userId === props.creatorId ? (
                    <p><i className="fas fa-user"></i> Owner</p>
                ) : (
                        <button onClick={props.onDetail.bind(this, props.eventId)}>View Details</button>
                    )}

            </div>
        </div>
    </li>
);

export default eventItem;