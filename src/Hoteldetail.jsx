import React, { useState } from 'react';

function HotelDetail({ location }) {
  const { hotel } = location?.state || {};
  const [selectedLocation, setSelectedLocation] = useState('');

  // Define some inbuilt location details
  const locationDetails = {
    Egmore: {
      amenities: ['Free Wi-Fi', 'Breakfast', 'Pool'],
      price: 'Rs100'
    },
    Santhome: {
      amenities: ['Gym', 'Spa', 'Restaurant'],
      price: 'Rs120'
    },
    Nungambakkam: {
      amenities: ['Parking', 'Room Service', 'Bar'],
      price: 'Rs90'
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <h1>Hotel details</h1>
      {hotel ? (
        <>
          <h2>Hotel name: {hotel.name}</h2>
          <p>Price: {hotel.price}</p>
          <p>Location: {hotel.location}</p>
        </>
      ) : null}

      <div>
        <h3>Select Location</h3>
        <select value={selectedLocation} onChange={(e) => handleLocationChange(e.target.value)}>
          <option value="">Select location</option>
          <option value="Egmore">Egmore</option>
          <option value="Santhome">Santhome</option>
          <option value="Nungambakkam">Nungambakkam</option>
        </select>
      </div>

      {selectedLocation && locationDetails[selectedLocation] && (
        <div>
          <h3>Amenities for {selectedLocation}</h3>
          <p>Amenities: {locationDetails[selectedLocation].amenities.join(', ')}</p>
          <h3>Price for {selectedLocation}</h3>
          <p>Price: {locationDetails[selectedLocation].price}</p>
        </div>
      )}
    </div>
  );
}

export default HotelDetail;
