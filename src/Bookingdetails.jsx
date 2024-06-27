import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingDetails = ({ location, bookings }) => {
  const navigate = useNavigate();
  const booking = bookings.find(b => b.location === location);

  const handleBookNow = () => {
    const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn')); // Simple login check using localStorage
    const loginUrl = `/login?redirect=${encodeURIComponent(`/payment?location=${booking.location}`)}`;

    if (isLoggedIn) {
      navigate(`/payment?location=${booking.location}`);
    } else {
      alert('You need to login for book.');
      navigate(loginUrl);
    }
  };

  if (!booking) {
    return <div>No booking details found for this location.</div>;
  }

  return (
    <div>
      <h3>Booking Details for {location}</h3>
      <p>Hotel Name: {booking.details.Hotelname}</p>
      <p>Amenities: {booking.details.amenities.join(', ')}</p>
      <p>Price: {booking.details.price}</p>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
};

export default BookingDetails;
