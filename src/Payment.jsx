import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [validationError, setValidationError] = useState('');
  const [bookingLocation, setBookingLocation] = useState('');
  const [price, setPrice] = useState('');

  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location');
    const priceParam = searchParams.get('price');
    setBookingLocation(locationParam);
    setPrice(priceParam);

    // Logging to verify if parameters are set correctly
    console.log('Location:', locationParam);
    console.log('Price:', priceParam);
  }, [location.search]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) {
        setCardDetails({ ...cardDetails, [name]: formattedValue });
      }
    } else if (name === 'expiryDate') {
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length <= 4) {
        if (formattedValue.length >= 3) {
          formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
        }
        setCardDetails({ ...cardDetails, [name]: formattedValue });
      }
    } else if (name === 'cvv') {
      if (value.length <= 3) {
        setCardDetails({ ...cardDetails, [name]: value });
      }
    }
  };

  const validateCardDetails = () => {
    const cardNumberPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    if (!cardNumberPattern.test(cardDetails.cardNumber)) {
      return 'Invalid card number. Must be 16 digits.';
    }
    if (!expiryDatePattern.test(cardDetails.expiryDate)) {
      return 'Invalid expiry date. Must be MM/YY format.';
    }
    if (!cvvPattern.test(cardDetails.cvv)) {
      return 'Invalid CVV. Must be 3 digits.';
    }
    return '';
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    const error = validateCardDetails();
    if (error) {
      setValidationError(error);
      return;
    }
  
    // Clear validation error
    setValidationError('');
  
    // Simulating payment processing delay
    setTimeout(async () => {
      setPaymentCompleted(true);
      setShowCardModal(false); // Close the modal after payment
  
      const paymentReceipt = {
        username,
        hotelName: bookingLocation,
        price, // Ensure price is correctly set here
        paymentStatus: 'Payment Successful',
        checkInDate: new Date(), // Example check-in date
        checkOutDate: new Date() // Example check-out date
      };
  
      console.log("Payment receipt to be sent:", paymentReceipt);
  
      try {
        // Correct the URL here to avoid double slashes
        const response = await axios.post('http://localhost:3000/api/bookings', paymentReceipt);
        console.log('Payment receipt saved:', response.data);
  
        // Redirect to booking confirmation page after payment completion
        navigate("/booking-confirmation", { state: paymentReceipt });
      } catch (error) {
        console.error('Failed to save payment receipt:', error);
        setValidationError('Failed to save payment receipt. Please try again.');
      }
    }, 2000);
  };
  

  const handlePayment = () => {
    setShowCardModal(true); // Show the card details modal
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>You are about to book {bookingLocation}.</p>
      
      {paymentCompleted ? (
        <div>Payment completed!</div>
      ) : (
        <button onClick={handlePayment}>Pay Now</button>
      )}

      {showCardModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowCardModal(false)} className="close-button">X</button>
            <h3>Enter Card Details</h3>
            {validationError && <p className="error-message">{validationError}</p>}
            <form onSubmit={handleCardSubmit}>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  maxLength="5"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  maxLength="3"
                  placeholder="123"
                  required
                />
              </div>
              <button type="submit">Submit Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
