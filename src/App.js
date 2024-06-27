import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './Booking';
import BookingLog from './Bookinglog';
import BookingNew from './Bookingnew';
import ContactUs from './Contactus';
import ExampleReducer from './Examplereducer';
import Home from './Home';
import HotelDetail from './Hoteldetail';
import HotelSearch from './Hotelsearch';
import Login from './login'; // Ensure the correct casing
import Navbar from './Navbar';
import Payment from './Payment';
import PriceCompar from './Pricecompar';
import Register from './Register'; 
import Review from './Review';
import Logout from './logout';
import BookingConfirmation from './Bookingconfirmation';

import './App.css';
 // Import the new CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookinglog" element={<BookingLog />} />
          <Route path="/bookingnew" element={<BookingNew />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/examplereducer" element={<ExampleReducer />} />
          <Route path="/hoteldetail" element={<HotelDetail />} />
          <Route path="/hotelsearch" element={<HotelSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pricecompar" element={<PriceCompar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element={<Review />} />
          <Route path="/Logout" element={<Logout/>}/>
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Hotel Booking App. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
