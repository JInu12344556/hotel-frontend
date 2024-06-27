import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken'); // Remove any other authentication-related items if necessary

    // Redirect to the homepage or login page
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h3>You have been logged out.</h3>
    </div>
  );
};

export default Logout;
