import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/booking-confirmation';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setAlreadyLoggedIn(true);
    }
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    if (alreadyLoggedIn) {
      setErrorMessage('You are already logged in. Please log out first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Login successful:', data);
        if (data.username) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', data.username);
          navigate(redirectTo);
        } else {
          setErrorMessage('Login successful, but username is missing in the response.');
        }
      } else {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setAlreadyLoggedIn(false);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <h2>Welcome Back to Hotelbook!</h2>
      <p>
        Don’t have an account? <button className="link-button" onClick={handleRegisterClick}>Create a new account now</button>, it's FREE! Takes less than a minute.
      </p>
      {alreadyLoggedIn ? (
        <div className="warning-message">
          <p>You are already logged in. Please log out if you want to log in with a different account.</p>
          <div className="button-group">
            <button onClick={() => navigate(redirectTo)}>Continue</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form-container">
            <div className="form-field">
              <Field type="email" name="email" placeholder="Email" autoComplete="username" required />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-field">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                className="toggle-password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="button-group">
              <button type="submit" className="login-button">Login Now</button>
            </div>
          </Form>
        </Formik>
      )}
      <button className="google-login-button" onClick={() => alert('Google login functionality is not implemented.')}>Login with Google</button>
      <p className="forgot-password">
        Forget password <a href="/forgot-password">Click here</a>
      </p>
      <p className="register-text">If you don't have an account, please register</p>
      <div className="button-group">
        <button type="button" className="register-button" onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
};

export default LoginForm;
