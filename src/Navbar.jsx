import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Navbar = () => {

  const redirectToHotelDetail = () => {
    // Define the logic to redirect to the hotel detail page
    // For example:
    // history.push('/hoteldetail'); // Assuming you have access to history object
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/contactus" className="nav-link">Contact Us</Link></li>
        {/* Add buttons for additional routes */}
        <li><Link to="/hoteldetail" className="nav-link">Hotel detail</Link></li>
        <li><Link to="/Booking" className="nav-link">Booking</Link></li>
        <li><Link to="/hotelsearch" className="nav-link">Hotel Search</Link></li>
        <li><Link to="/payment" className="nav-link">Payment</Link></li>
       <li><Link to="/review" className="nav-link">Review</Link></li>
        <li><Link to="/bookinglog" className="nav-link">Booking Log</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
      <div className="auth-buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
