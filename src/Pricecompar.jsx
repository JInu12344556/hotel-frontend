// HotelDetail.js (updated)
import React from 'react';

const HotelDetail = ({ hotel, prices }) => {
  return (
    <div>
      <h2>{hotel.name}</h2>
      <p>Price: {hotel.price}</p>
      <p>Comparison Prices: {prices.join(', ')}</p>
      <p>Amenities: {hotel.amenities.join(', ')}</p>
      <p>Location: {hotel.location}</p>
    </div>
  );
};

export default HotelDetail;
