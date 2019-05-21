import React from 'react';
import '../components/css/BookingsDisplay.css';

const bookingDisplay = props => {
  return (
    <div className="booking-display">
      <button
        className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}>
        List
    </button>
      <button
        className={props.activeOutputType === 'stats' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'stats')}>
        Stats
    </button>
    </div>
  )
}

export default bookingDisplay;