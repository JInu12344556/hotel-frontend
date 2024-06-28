import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const [username, setUsername] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        if (!storedUsername) {
          throw new Error('Username not found in localStorage');
        }

        const fetchedHotelName = location.state?.hotelName || 'Default Hotel';
        if (!fetchedHotelName) {
          throw new Error('Hotel name not found in location state');
        }

        setUsername(storedUsername);
        setHotelName(fetchedHotelName);

        await sendConfirmationData(storedUsername, fetchedHotelName);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Failed to fetch booking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const sendConfirmationData = async (username, hotelName) => {
    try {
      const response = await axios.post('http://localhost:3000/api/bookings/confirmation', {
        userName: username,
        paymentStatus: 'Payment Successful',
        hotelName: hotelName,
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send booking confirmation.');
    }
  };

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmation</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p>Hello, {username}! Your booking at {hotelName} was successful.</p>
          <p>Payment Status: Payment Successful</p>
        </>
      )}
    </div>
  );
};

export default BookingConfirmation;
