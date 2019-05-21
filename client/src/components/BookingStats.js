import React from 'react'

const BOOKINGS_BUCKETS = {
  'Low': {
    min:0,
    max:100
  },
  'Medium': {
    min:250,
    max:499
  },
  'High': {
    min:500,
    max:1000
  }
}

const BookingStats = props => {
  const output = {};
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((
      prev, current
    ) => {
      if (current.event.price > BOOKINGS_BUCKETS[bucket].min && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
        return prev + 1
      } else {
        return prev;
      }
    },0);
    output[bucket] = filteredBookingsCount;
  }
  console.log(output);
  return (
    <div>
      stATS
    </div>
  )
}

export default BookingStats;
