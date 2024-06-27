import React, { useState, useEffect } from 'react';
import BookingDetails from './Bookingdetails';

const ParentComponent = () => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      const mockBookings = [
        { id: 1, location: 'Egmore', details: { Hotelname: "Vijaya Hotel", amenities: ['Free Wi-Fi', 'Breakfast', 'Pool'], price: '10000rs' } },
        { id: 2, location: 'Santhome', details: { Hotelname: "Sangetha Hotel", amenities: ['Gym', 'Spa', 'Restaurant'], price: '7000rs' } },
        { id: 3, location: 'Nungambakkam', details: { Hotelname: "Jalal Hotel", amenities: ['Parking', 'Room Service', 'Bar'], price: '9000rs' } }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 2000); // Simulating 2 seconds delay
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Manage Your Bookings</h2>
          <label htmlFor="location">Select Location:</label>
          <select id="location" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {bookings.map(booking => (
              <option key={booking.id} value={booking.location}>{booking.location}</option>
            ))}
          </select>
          {selectedLocation && (
            <BookingDetails location={selectedLocation} bookings={bookings} />
          )}
        </>
      )}
    </div>
  );
};

export default ParentComponent;
