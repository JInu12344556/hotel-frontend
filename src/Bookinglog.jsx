import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingLogs = () => {
  const [bookingLogs, setBookingLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setBookingLogs(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem('authToken')) {
      navigate('/login?redirect=/booking-logs');
    } else {
      fetchAllBookings();
    }
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <h2>Booking Logs</h2>
        <p>Loading booking logs...</p>
      </div>
    );
  }

  if (bookingLogs.length === 0) {
    return (
      <div>
        <h2>Booking Logs</h2>
        <p>No booking logs available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Booking Logs</h2>
      {bookingLogs.map((booking, index) => {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + Math.floor(booking.price / 100)); // Example logic for checkout date
        return (
          <div key={index}>
            <p>Thank you, {booking.username}, for your booking!</p>
            <p>Hotel Name: {booking.hotelName}</p>
            <p>Check-in Date: {checkInDate.toLocaleDateString()} {checkInDate.toLocaleTimeString()}</p>
            <p>Check-out Date: {checkOutDate.toLocaleDateString()} {checkOutDate.toLocaleTimeString()}</p>
            <p>Payment Status: {booking.paymentStatus}</p>
            <p>Price: ${booking.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookingLogs;
