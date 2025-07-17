import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_11.css';

function Assignment_12() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);


  useEffect(() => {
    const checkExistingToken = async () => {

      let token = localStorage.getItem('access_token');
      let storage = 'localStorage';
      

      if (!token) {
        token = sessionStorage.getItem('access_token');
        storage = 'sessionStorage';
      }
      
      if (token) {
        setLoading(true);
        try {

          const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          

          setUserDetails(userResponse.data);
          setMessage(`Logged in from ${storage}`);
          
        } catch (error) {

          localStorage.removeItem('access_token');
          sessionStorage.removeItem('access_token');
          setMessage('Session expired. Please login again.');
        }
        setLoading(false);
      }
    };
    
    checkExistingToken();
  }, []);

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

        if (keepLoggedIn) {
          localStorage.setItem('access_token', token);
          setMessage('Login successful! (Stored in localStorage)');
        } else {
          sessionStorage.setItem('access_token', token);
          setMessage('Login successful! (Stored in sessionStorage)');
        }
        

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

    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    

    setUserDetails(null);
    setEmail('');
    setPassword('');
    setMessage('');
    setKeepLoggedIn(false);
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
          <h3>Storage Info:</h3>
          <p>• localStorage: Persists until manually cleared</p>
          <p>• sessionStorage: Clears when browser tab is closed</p>
          <p>• To modify user details, visit: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
        </div>
      </div>
    );
  }


  return (
    <div className="login-container">
      <h2 className="login-title">Assignment 12 - JWT Login with Storage</h2>
      
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


      <div className="form-group">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-label">Keep me logged in</span>
        </label>
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
        <p>3. Check "Keep me logged in" to use localStorage (persistent)</p>
        <p>4. Uncheck to use sessionStorage (temporary)</p>
        
        <h3>Storage Differences:</h3>
        <p>• <strong>localStorage:</strong> Data persists until manually cleared</p>
        <p>• <strong>sessionStorage:</strong> Data clears when browser tab is closed</p>
      </div>
    </div>
  );
}

export default Assignment_12;