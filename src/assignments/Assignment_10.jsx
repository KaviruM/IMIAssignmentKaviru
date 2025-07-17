import React, { useState } from 'react';
import axios from 'axios';
import './Assignment_11.css';

function Assignment_10() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    console.log('handleLogin function called');
    
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      setError('Please enter both email and password');
      return;
    }

    console.log('Validation passed, starting login process');
    setLoading(true);
    
    console.log('Attempting login with:', { email: email.trim(), password: '***' });
    
    axios.post('https://auth.dnjs.lk/api/login', {
      email: email.trim(),
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 
    })
    .then(response => {
      console.log('Axios request successful');

      console.log('Login API Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);


      if (response.status === 200 && response.data && response.data.token) {
        console.log('Login successful, setting success message');
        setSuccess('Login successful! JWT token received.');
        console.log('JWT Token:', response.data.token);

      } else {
        console.log('Login failed - no token in response');

        const errorMessage = response.data?.message || 'Login failed. Please check your credentials.';
        setError(errorMessage);
        console.error('Login failed:', errorMessage);
      }
    })
    .catch(err => {
      console.log('Axios request failed');
 
      console.error('Login Error:', err);
      
      if (err.response) {

        console.error('Server Error Response:', err.response.data);
        console.error('Error Status:', err.response.status);
        
        const errorMessage = err.response.data?.message || 
                           err.response.data?.error || 
                           `Server error: ${err.response.status}`;
        setError(`${errorMessage} (Status: ${err.response.status})`);
      } else if (err.request) {

        setError('Network error. Please check your connection and ensure the API is accessible.');
        console.error('Network Error - No response received:', err.request);
      } else if (err.code === 'ECONNABORTED') {

        setError('Request timeout. Please try again.');
      } else {

        setError('An unexpected error occurred: ' + err.message);
      }
    })
    .finally(() => {
      console.log('Login process completed, setting loading to false');
      setLoading(false);
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Assignment 10 - JWT Login</h2>
      
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-input"
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="login-button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Error message */}
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="success-message">
          <strong>Success:</strong> {success}
        </div>
      )}

    </div>
  );
}

export default Assignment_10;