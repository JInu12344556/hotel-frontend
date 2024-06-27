import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmpassword) {
      alert("Password and Confirm Password do not match");
      return; // Exit early if passwords don't match
    }

    // Send data to the backend
    axios.post('http://localhost:3000/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
    .then(response => {
      console.log(response.data);
      alert('You have registered for the hotel. Now you can login and book the hotel.');
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={formData.confirmpassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
