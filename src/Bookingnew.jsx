import React, { useState } from 'react';
import axios from 'axios';

const Booking = ({ bookings }) => {
  const [newBooking, setNewBooking] = useState({ hotelName: '', checkInDate: '', checkOutDate: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/bookings', newBooking);
      console.log('Booking saved:', response.data);
    } catch (error) {
      console.error('There was an error saving the booking!', error);
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="hotelName"
          value={newBooking.hotelName}
          onChange={handleInputChange}
          placeholder="Hotel Name"
        />
        <input
          type="date"
          name="checkInDate"
          value={newBooking.checkInDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="checkOutDate"
          value={newBooking.checkOutDate}
          onChange={handleInputChange}
        />
        <button type="submit">Book</button>
      </form>
      <h2>Existing Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.hotelName} from {booking.checkInDate} to {booking.checkOutDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
