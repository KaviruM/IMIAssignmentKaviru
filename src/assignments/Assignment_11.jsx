import React, { useState } from 'react';
import axios from 'axios';
import './Assignment_11.css';

function Assignment_11() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {

      const response = await axios.post('https://auth.dnjs.lk/api/login', {
        email,
        password
      });

      const data = response.data;
      const token = data.token || data.access_token;
      
      if (token) {
        setMessage('Login successful!');
        

        const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUserDetails(userResponse.data);
      }
    } catch (error) {
      if (error.response) {

        setMessage('Login failed. Please check your credentials.');
      } else {

        setMessage('Network error. Please try again.');
      }
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setUserDetails(null);
    setEmail('');
    setPassword('');
    setMessage('');
  };


  if (userDetails) {
    return (
      <div className="login-container">
        <h2 className="login-title">Welcome!</h2>
        
        {message && (
          <div className="success-message">
            <strong>Success:</strong> {message}
          </div>
        )}

        <div className="user-details">
          <h3>Your Details:</h3>
          

          {userDetails.profile_picture && (
            <img 
              src={userDetails.profile_picture} 
              alt="Profile" 
              className="profile-picture"
            />
          )}
          

          {userDetails.name && (
            <div className="user-name">{userDetails.name}</div>
          )}
          

          {userDetails.bio && (
            <div className="user-bio">
              <strong>Bio:</strong> {userDetails.bio}
            </div>
          )}
          

          {Object.entries(userDetails).map(([key, value]) => (
            typeof value === 'string' && key !== 'name' && key !== 'bio' && key !== 'profile_picture' && (
              <div key={key} className="user-field">
                <strong>{key}:</strong> {value}
              </div>
            )
          ))}
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>

        <div className="instructions">
          <h3>Instructions:</h3>
          <p>1. Create an account at: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
          <p>2. Use your registered email and password to login</p>
          <p>3. To modify user details, visit the website above and update them</p>
        </div>
      </div>
    );
  }


  return (
    <div className="login-container">
      <h2 className="login-title">Assignment 11 - JWT Login</h2>
      
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
        className={loading ? 'login-button disabled' : 'login-button'}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          <strong>{message.includes('successful') ? 'Success:' : 'Error:'}</strong> {message}
        </div>
      )}

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>1. Create an account at: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
        <p>2. Use your registered email and password to login</p>
        <p>3. To modify user details, visit the website above and update them</p>
      </div>
    </div>
  );
}

export default Assignment_11;