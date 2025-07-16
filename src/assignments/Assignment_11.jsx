// Assignment_11.jsx
import React, { useState } from 'react';
import './Assignment_11.css';

function Assignment_11() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Login function
  const handleLogin = async () => {
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Check if email and password are entered
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      // Make login request
      const response = await fetch('https://auth.dnjs.lk/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Full login response:', data);

      if (response.ok) {
        // Check for different possible token fields
        const token = data.token || data.access_token || data.jwt || data.authToken;
        
        if (token) {
          // Login successful
          setSuccess('Login successful!');
          setIsLoggedIn(true);
          
          // Get user details
          getUserDetails(token);
        } else {
          console.log('No token found in response:', data);
          setError('Login response missing token. Check console for details.');
        }
      } else {
        // Login failed - show detailed error
        console.log('Login failed with status:', response.status);
        console.log('Error response:', data);
        
        let errorMessage = 'Login failed. ';
        
        if (response.status === 401) {
          errorMessage += 'Invalid email or password.';
        } else if (response.status === 400) {
          errorMessage += data.message || data.error || 'Bad request.';
        } else if (response.status === 422) {
          errorMessage += 'Invalid input format.';
        } else if (response.status >= 500) {
          errorMessage += 'Server error. Please try again later.';
        } else {
          errorMessage += `Server returned status ${response.status}.`;
        }
        
        errorMessage += ' Check console for details.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Network/Login error:', err);
      setError('Network error. Please try again. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Get user details function
  const getUserDetails = async (token) => {
    try {
      console.log('Fetching user details with token:', token);
      
      const response = await fetch('https://auth.dnjs.lk/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('User details response status:', response.status);
      console.log('User details response ok:', response.ok);
      
      const data = await response.json();
      console.log('Full user details response:', data);

      if (response.ok) {
        setUserDetails(data);
      } else {
        console.log('Failed to get user details:', data);
        setError('Failed to get user details. Check console for details.');
      }
    } catch (err) {
      console.error('User details error:', err);
      setError('Failed to get user details. Check console for details.');
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails(null);
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // If logged in, show user details
  if (isLoggedIn) {
    return (
      <div className="login-container">
        <h2 className="login-title">Assignment #11 - User Details</h2>
        
        {success && (
          <div className="success-message">
            <strong>Success:</strong> {success}
          </div>
        )}

        {userDetails && (
          <div className="user-details">
            <h3>Your Details:</h3>
            
            {/* Show available user information */}
            {Object.keys(userDetails).map(key => {
              const value = userDetails[key];
              
              // Skip empty values and objects
              if (!value || typeof value === 'object') {
                return null;
              }
              
              return (
                <div key={key} className="user-field">
                  <strong>{key}:</strong> {value}
                </div>
              );
            })}
            
          </div>
        )}

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>

        <div className="instructions">
          <h3>Instructions:</h3>
          <p>1. Create an account at: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
          <p>2. Use your registered email and password to login</p>
          <p>3. Check the browser console for API responses</p>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="login-container">
      <h2 className="login-title">Assignment #11 - JWT Login & User Details</h2>
      
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
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
          onKeyPress={handleKeyPress}
          placeholder="Enter your password"
          className="form-input"
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className={loading ? 'login-button disabled' : 'login-button'}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          <strong>Success:</strong> {success}
        </div>
      )}

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>1. Create an account at: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
        <p>2. Use your registered email and password to login</p>
        <p>3. Check the browser console for API responses</p>
      </div>
    </div>
  );
}

export default Assignment_11;