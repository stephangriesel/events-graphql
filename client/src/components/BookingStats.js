import React from 'react'

const BOOKINGS_BUCKETS = {
  'Low': 100,
  'Medium': 250,
  'High': 500
}

const BookingStats = props => {
  const output = {};
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((
      prev, current
    ) => {
      if (current.price < BOOKINGS_BUCKETS[bucket]) {
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
